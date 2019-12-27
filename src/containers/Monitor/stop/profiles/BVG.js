import {dateToHHMM} from "./utils";

let moment = require("moment");
require("moment-duration-format");

const axios = require("axios").default;

const baseUrl = "https://api.transportflow.online";

export async function findDeparturesForBVG(stopID, dispatch) {
    const stopSearch = await axios.get(baseUrl + "/stops/" + stopID).catch((err) => {
        if (err.toString().includes("500") || err.toString().includes("502")) {
            throw new Error("Haltestelle nicht gefunden")
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
            mapLink: "https://maps.apple.com/?dirflg=w&daddr=" + stop.location.longitude + "," + stop.location.latitude
        }
    });


    const monitorQuery = await axios.get(baseUrl + "/stops/" + stopID + "/departures?duration=140").catch((err) => {
        throw new Error(err.message);
    });

    const monitor = monitorQuery.data;
    monitor.splice(10);

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

        newDeparture.state = departure.delay === null || departure.delay === 0 ? "In time" : departure.delay > 0 ? "Delayed" : "Too early";
        newDeparture.delayTime = departure.delay/60 || 0;

        newDeparture.mode = departure.line.product;
        newDeparture.platform = departure.platform;
        newDeparture.platformTitle = "Steig";
        newDeparture.icon = getIconUrl(departure.line.product);

        newDeparture.line = departure.line.name;
        newDeparture.direction = departure.direction;

        newDeparture.arrivalTime = dateToHHMM(departure.when);
        newDeparture.arrivalTimeRelative =
            new Date(Date.parse(departure.when)).getTime() - Date.now() < 3.6e+6
                ? moment.duration(
                new Date(Date.parse(departure.when)).getTime() - Date.now()+30000,
                "milliseconds"
                )
                    .format("m[']")
                : moment.duration(
                departure.arrivalTimeRelative,
                "milliseconds"
                )
                    .format("h['']");

        monitor[i] = newDeparture;
    }
    dispatch({type: "SET_DEPARTURES", departures: monitor});
}

function getIconUrl(name) {
    switch (name) {
        case ("bus"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-bus.svg";
        case ("ferry"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg";
        case ("regional"):
            return "https://upload.wikimedia.org/wikipedia/commons/a/a6/VBB_Bahn-Regionalverkehr.svg";
        case ("express"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-train.svg";
        case ("suburban"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg";
        case ("subway"):
            return "https://upload.wikimedia.org/wikipedia/commons/a/a3/U-Bahn.svg";
        case ("tram"):
            return "https://www.dvb.de/assets/img/trans-icon/transport-tram.svg";
        default:
            return "";
    }
}