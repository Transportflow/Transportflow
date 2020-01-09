import * as dvb from "dvbjs";
import {dateToHHMM} from "./utils";

let moment = require("moment");
require("moment-duration-format");

export async function findSuggestions(input, dispatch) {
    let query = await dvb.findStop(input, 8000).catch((err) => {
        throw new Error(err.toString());
    });
    query.splice(7);
    await parseSuggestions(query, dispatch);
}
export async function findLocationSuggestions(latitude, longitude, dispatch) {
    const query = await dvb.findAddress(
        longitude,
        latitude, 8000
    ).catch((err) => {
        throw new Error(err.toString());
    });
    await parseSuggestions(query.stops, dispatch);
}
async function parseSuggestions(query, dispatch) {
    try {
        await getStopIcons(query);
    } catch (err) {
        // do nothing -> sometimes there are no icons uwu
    }

    // parse query in unified format
    let suggestions = [];
    for (let i = 0; i < query.length; i++) {
        suggestions.push({id: query[i].id, name: query[i].name + ", " + query[i].city, icons: query[i].icons});
    }

    dispatch({type: "SET_SUGGESTIONS", suggestions: suggestions});
}

export async function findDepartures(stopID, dispatch) {
    let stops = await dvb.findStop(stopID);
    if (stops.length === 0) {
        throw new Error("Haltestelle nicht gefunden");
    }
    dispatch({
        type: "SET_STOP", stop: {
            id: stops[0].id,
            name: stops[0].name + ", " + stops[0].city,
            longitude: stops[0].coords[0].toString().substring(0, 10),
            latitude: stops[0].coords[1].toString().substring(0, 10),
            mapLink: "https://maps.apple.com/?dirflg=w&daddr=" + stops[0].coords[1] + "," + stops[0].coords[0].toString()
        }
    });

    var query = await dvb.monitor(stops[0].id, 0, 80, 8000).catch(err => {
        throw new Error(err)
    });

    const mot = [];
    query.forEach(departure => {
        var toPush = departure.mode.title;
        if (
            toPush !== "" &&
            mot.indexOf(toPush) === -1 &&
            departure.arrivalTimeRelative > -1
        ) {
            mot.push(toPush);
        }
    });
    dispatch({type: "SET_MODES", modes: mot});

    for (let i = 0; i < query.length; i++) {
        let newDeparture = {};
        let departure = query[i];

        newDeparture.id = departure.id;
        newDeparture.state = departure.state === "Unknown" ? "No data" : departure.delayTime === 0 ? "In time" : departure.delayTime > 0 ? "Delayed" : "Too early";
        newDeparture.delayTime = departure.delayTime;
        newDeparture.stopid = stops[0].id;

        newDeparture.mode = departure.mode.title;

        if (departure.platform !== undefined) {
            newDeparture.platform = departure.platform.name;
            switch (departure.platform.type.toLowerCase()) {
                case "railtrack":
                    newDeparture.platformTitle = "Gleis";
                    break;
                default:
                    newDeparture.platformTitle = "Steig";
                    break;
            }
        }
        newDeparture.icon = departure.mode.iconUrl;

        newDeparture.line = departure.line;
        newDeparture.direction = departure.direction;
        newDeparture.fahrtNr = departure.id;
        newDeparture.when = departure.arrivalTime;
        newDeparture.cancelled = false; // I suppose DVB hasn't got anything in it's api to set a departure cancelled?

        newDeparture.arrivalTime = dateToHHMM(departure.arrivalTime);
        newDeparture.arrivalTimeRelative =
            departure.arrivalTimeRelative < 60
                ? moment.duration(
                departure.arrivalTimeRelative,
                "minutes"
                )
                    .format("m[']")
                : moment.duration(
                departure.arrivalTimeRelative,
                "minutes"
                )
                    .format("h['']");

        query[i] = newDeparture;
    }
    dispatch({type: "SET_DEPARTURES", departures: query});
}

async function getStopIcons(stops) {
    for (let stop of stops) {
        let lines = await dvb.lines(stop.id);

        stop.icons = [];
        lines.forEach((line,) => {
            if (stop.icons.indexOf(line.mode.iconUrl) === -1)
                stop.icons.push(line.mode.iconUrl);
        });
    }
}