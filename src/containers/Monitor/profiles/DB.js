import {dateToHHMM} from "./utils";
import {wagenreihung} from "../../../db-wagenreihung";

const axios = require("axios").default;

let moment = require("moment");
require("moment-duration-format");

const baseUrl = "https://db.transportflow.de";

export async function findSuggestions(input, dispatch) {
    const raw = await axios.get(baseUrl + "/locations?query=" + input + "&addresses=false&poi=false").catch((err) => {
        if (!err.toString().includes("500") || !err.toString().includes("502")) {
            throw new Error(err.toString());
        }
    });
    let query = raw.data;

    if (query.length === 0) {
        return;
    }

    await parseSuggestions(query, dispatch)
}
export async function findLocationSuggestions(latitude, longitude, dispatch) {
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

export async function findDepartures(stopID, dispatch) {
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


    const monitorQuery = await axios.get(baseUrl + "/stops/" + stopID + "/departures?duration=140").catch((err) => {
        throw new Error(err.message);
    });

    const monitor = monitorQuery.data;
    monitor.splice(30);

    if (monitor.length === 0) {
        throw new Error("Keine Abfahrten gefunden");
    }

    let allModes = [];
    monitor.forEach((departure, index) => {
        if (allModes.indexOf(departure.line.product) === -1)
            allModes.push(departure.line.product)
    });
    dispatch({type: "SET_MODES", modes: allModes});

    for (let i = 0; i < monitor.length; i++) {
        let newDeparture = {};
        let departure = monitor[i];

        newDeparture.state = departure.delay === null ? "No data" : departure.delay === 0 ? "In time" : departure.delay > 0 ? "Delayed" : "Too early";
        newDeparture.delayTime = departure.delay/60 || 0;

        newDeparture.mode = departure.line.product;
        newDeparture.platform = departure.platform;
        newDeparture.platformTitle = "Gleis"; // Deutsche Bahn has mostly only railtracks for platform information
        newDeparture.icon = getDepartureIcon(departure.line.product);

        newDeparture.line = departure.line.name;
        newDeparture.direction = departure.direction;
        newDeparture.fahrtNr = departure.line.fahrtNr;

        newDeparture.when = departure.when;
        newDeparture.arrivalTime = dateToHHMM(departure.when !== null ? departure.when : new Date(Date.now()).toUTCString());
        newDeparture.arrivalTimeRelative = departure.when !== null ?
            new Date(Date.parse(departure.when)).getTime() - Date.now() < 3.6e+6
                ? moment.duration(
                new Date(Date.parse(departure.when)).getTime() - Date.now()+30000,
                "milliseconds"
                )
                    .format("m[']")
                : moment.duration(
                new Date(Date.parse(departure.when)).getTime() - Date.now()+30000,
                "milliseconds"
                )
                    .format("h['']") : "0'";

        monitor[i] = newDeparture;
    }
    dispatch({type: "SET_DEPARTURES", departures: monitor});
}

function getStopIcons(stops) {
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
function getDepartureIcon(name) {
    switch (name) {
        case ("bus"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-bus.svg";
        case ("ferry"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg";
        case ("nationalExpress"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-train.svg";
        case ("national"):
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
export async function getWagenreihung(fahrtNr, when, product) {
    if (when === null)
        throw new Error("when is null");

    if (product === "nationalExpress"
        || product === "national"
        || product === "regional"
        || product === "regionalExpress") {
        try {
            return await wagenreihung(fahrtNr, when);
        } catch (err) {
            throw new Error(err);
        }
    } else {
        return undefined;
    }
}