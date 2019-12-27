import * as dvb from "dvbjs";
import {dateToHHMM} from "./utils";

let moment = require("moment");
require("moment-duration-format");

export async function findDeparturesForDVB(stopID, dispatch) {
    var stops = await dvb.findStop(stopID);
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

    var query = await dvb.monitor(stops[0].id, 0, 30, 8000).catch(err => {
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

    console.log(query)
    for (let i = 0; i < query.length; i++) {
        let newDeparture = {};
        let departure = query[i];

        newDeparture.id = departure.id;
        newDeparture.state = departure.delay === null || departure.delay === 0 ? "In time" : departure.delay > 0 ? "Too late" : "Too early";
        newDeparture.delayTime = departure.delay;

        newDeparture.mode = departure.mode.title;
        newDeparture.platform = departure.platform.name;
        switch (departure.platform.type.toLowerCase()) {
            case "railtrack":
                newDeparture.platformTitle = "Gleis";
                break;
            default:
                newDeparture.platformTitle = "Steig";
                break;
        }
        newDeparture.icon = departure.mode.iconUrl;

        newDeparture.line = departure.line;
        newDeparture.direction = departure.direction;

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