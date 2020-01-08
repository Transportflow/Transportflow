import * as dvb from "dvbjs";

const axios = require("axios").default;
let moment = require("moment");
require("moment-duration-format");

export function dateToHHMM(date) {
    return new Date(Date.parse(date))
            .getHours()
            .toString()
            .padStart(2, "0") +
        ":" +
        new Date(Date.parse(date))
            .getMinutes()
            .toString()
            .padStart(2, "0")
}
export function dateToHHMMDVB(date) {
    let d = new Date();
    d.setTime(date);
    return d
            .getHours()
            .toString()
            .padStart(2, "0") +
        ":" +
        d
            .getMinutes()
            .toString()
            .padStart(2, "0")
}
export function parseRelativeTime(when) {
    return new Date(Date.parse(when)).getTime() - Date.now() < 3.6e+6
        ? moment.duration(
        new Date(Date.parse(when)).getTime() - Date.now()+30000,
        "milliseconds"
        )
            .format("m[']")
        : moment.duration(
        new Date(Date.parse(when)).getTime() - Date.now()+30000,
        "milliseconds"
        )
            .format("h[h]")
}
export async function findUtilitySuggestions(baseUrl, input, dispatch) {
    const raw = await axios.get(baseUrl + "/locations?query=" + input + "&addresses=false&poi=false");
    let query = raw.data;

    if (query.length === 0) {
        return;
    }

    await parseSuggestions(query, dispatch)
}
export async function findUtilityLocationSuggestions(baseUrl, latitude, longitude, dispatch) {
    const raw = await axios.get(baseUrl + "/stops/nearby?latitude=" + latitude + "&longitude=" + longitude);
    const query = raw.data;

    await parseSuggestions(query, dispatch);
}
async function parseSuggestions(query, dispatch) {
    await getStopIcons(query);

    // parse query in unified format
    let suggestions = [];
    for (let i = 0; i < query.length; i++) {
        suggestions.push({id: query[i].id, name: query[i].name, icons: query[i].icons});
    }

    dispatch({type: "SET_SUGGESTIONS", suggestions: suggestions});
}
export async function searchStop(baseUrl, stopID, dispatch) {
    const stopSearch = await axios.get(baseUrl + "/stops/" + stopID).catch((err) => {
        if (err.toString().includes("500")) {
            throw new Error("Haltestelle nicht gefunden")
        } else if (err.toString().includes("502")) {
            throw new Error("Service Error, bitte erneut versuchen")
        }
    });

    const stop = stopSearch.data;
    if (stop === undefined) {
        throw new Error("Haltestelle nicht gefunden")
    }

    dispatch({
        type: "SET_STOP", stop: {
            id: stop.id,
            name: stop.name,
            longitude: stop.location.longitude,
            latitude: stop.location.latitude,
            mapLink: "https://maps.apple.com/?dirflg=w&daddr=" + stop.location.latitude + "," + stop.location.longitude
        }
    });
}
export async function monitor(baseUrl, stopID, dispatch) {
    const monitorQuery = await axios.get(baseUrl + "/stops/" + stopID + "/departures?duration=340").catch((err) => {
        throw new Error(err.message);
    });

    const monitor = monitorQuery.data;

    let allModes = [];
    monitor.forEach((departure) => {
        if (allModes.indexOf(departure.line.product) === -1)
            allModes.push(departure.line.product)
    });
    dispatch({type: "SET_MODES", modes: allModes});

    if (monitor.length === 0) {
        throw new Error("Keine Abfahrten gefunden");
    }

    return monitor;
}
export async function getNextStops(baseUrl, id, lineName, when) {
    let stops = await axios.get(baseUrl + "/trips/" + id + "?lineName=" + lineName).catch(err => console.log(err)).then((res) => res.data.stopovers);

    stops.forEach(val => {
        val.time = dateToHHMM(val.arrival !== null ? val.arrival : val.departure);
        val.timeRelative = val.arrival !== null ? moment.duration(
            new Date(Date.parse(val.arrival)).getTime() - new Date(Date.parse(when)).getTime(),
            "milliseconds"
        )
            .format("+h[h] m[']") : moment.duration(
            new Date(Date.parse(val.departure)).getTime() - new Date(Date.parse(when)).getTime(),
            "milliseconds"
        )
            .format("+h[h] m[']");
        val.products = val.stop.products;
        val.name = val.stop.name;
    });

    let toSplice = 1;
    for (let i = 0; i < stops.length; i++) {
        if (stops[i].timeRelative.includes("-") || stops[i].timeRelative.includes("+0'")) {
            toSplice++;
        }
    }
    stops.splice(0, toSplice);

    getStopIcons(stops);

    return stops;
}
export async function getNextStopsDVB(tripid, time, stopid) {
    let stops = await axios.post("https://webapi.vvo-online.de/dm/trip",
        {tripid: tripid, time: time, stopid: stopid}, {timeout: 10000})
        .then(res => res.data.Stops)
        .catch(error=>console.log(error));

    let toDelete = 1;
    stops.forEach((stop) => {
        if (stop.Position === "Previous")
            toDelete++;
    });
    stops.splice(0, toDelete);

    stops.forEach(stop => {
        stop.id = stop.Id;
        stop.name = stop.Name;
        stop.Time = stop.Time.replace("/Date(", "").replace("-0000)/", "");
        if (stop.RealTime)
            stop.RealTime = stop.RealTime.replace("/Date(", "").replace("-0000)/", "");
        stop.time = dateToHHMMDVB(stop.RealTime !== undefined ? stop.RealTime : stop.Time);
        stop.timeRelative = stop.RealTime !== undefined ? moment.duration(
            stop.RealTime - new Date(Date.parse(time)).getTime(),
            "milliseconds"
        )
            .format("+h[h] m[']") : moment.duration(
            stop.Time - new Date(Date.parse(time)).getTime(),
            "milliseconds"
        )
            .format("+h[h] m[']");
    });
    await getStopIconsDVB(stops);

    return stops;
}
async function getStopIconsDVB(stops) {
    for (let stop of stops) {
        let lines = await dvb.lines(stop.id);

        stop.icons = [];
        lines.forEach((line,) => {
            if (stop.icons.indexOf(line.mode.iconUrl) === -1)
                stop.icons.push(line.mode.iconUrl);
        });
    }
}
export function getStopIcons(stops) {
    stops.forEach(stop => {
        stop.icons = [];
        if (stop.products.subway)
            stop.icons.push("https://upload.wikimedia.org/wikipedia/commons/a/a3/U-Bahn.svg");
        if (stop.products.bus)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-bus.svg");
        if (stop.products.tram)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-tram.svg");
        if (stop.products.suburban)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg");
        if (stop.products.regional)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-train.svg");
        if (stop.products.ferry)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg");
        if (stop.products.express)
            stop.icons.push("https://upload.wikimedia.org/wikipedia/commons/a/a6/VBB_Bahn-Regionalverkehr.svg");
    });
}
export function getDepartureIcon(name) {
    switch (name) {
        case ("bus"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-bus.svg";
        case ("ferry"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg";
        case ("nationalExpress"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-train.svg";
        case ("national"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-train.svg";
        case ("express"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-train.svg";
        case ("regionalExp"):
            return "https://upload.wikimedia.org/wikipedia/commons/a/a6/VBB_Bahn-Regionalverkehr.svg";
        case ("regional"):
            return "https://upload.wikimedia.org/wikipedia/commons/a/a6/VBB_Bahn-Regionalverkehr.svg";
        case ("suburban"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg";
        case ("subway"):
            return "https://upload.wikimedia.org/wikipedia/commons/a/a3/U-Bahn.svg";
        case ("tram"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-tram.svg";
        case ("taxi"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-alita.svg";
        default:
            return "";
    }
}