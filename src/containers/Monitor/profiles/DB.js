import {
    dateToHHMM,
    parseRelativeTime,
    searchStop,
    monitor,
    getDepartureIcon,
    findUtilitySuggestions,
    findUtilityLocationSuggestions
} from "./utils";
import {wagenreihung} from "../../../db-wagenreihung";

const baseUrl = "https://db.transportflow.de";

export async function findSuggestions(input, dispatch) {
    await findUtilitySuggestions(baseUrl, input, dispatch);
}
export async function findLocationSuggestions(latitude, longitude, dispatch) {
    await findUtilityLocationSuggestions(baseUrl, latitude, longitude, dispatch);
}

export async function findDepartures(stopID, dispatch) {
    try {
        await searchStop(baseUrl, stopID, dispatch);
    } catch (err) {
        if (err.toString().includes("Service Error, bitte erneut versuchen"))
            await searchStop(baseUrl, stopID, dispatch);
        else
            throw err;
    }

    let departures;
    try {
        departures = await monitor(baseUrl, stopID, dispatch);
    } catch (err) {
        throw err;
    }

    for (let i = 0; i < departures.length; i++) {
        let departure = departures[i];

        let newDeparture = {
            state: departure.delay === null ? "No data" : departure.delay === 0 ? "In time" : departure.delay > 0 ? "Delayed" : "Too early",
            delayTime: departure.delay/60 || 0,
            mode: departure.line.product,
            platform: departure.platform,
            platformTitle: "Gleis", // Deutsche Bahn has mostly only railtracks for platform information
            line: departure.line.name,
            direction: departure.direction,
            fahrtNr: departure.line.fahrtNr,
            when: departure.when
        };

        newDeparture.icon = getDepartureIcon(departure.line.product);
        newDeparture.arrivalTime = dateToHHMM(departure.when !== null ? departure.when : new Date(Date.now()).toUTCString());
        newDeparture.arrivalTimeRelative = departure.when !== null ? parseRelativeTime(departure.when) : "0'";

        departures[i] = newDeparture;
    }
    dispatch({type: "SET_DEPARTURES", departures: departures});
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