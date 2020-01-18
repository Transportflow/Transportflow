import {
    dateToHHMM,
    parseRelativeTime,
    searchStop,
    getDepartureIcon,
    findUtilitySuggestions,
    findUtilityLocationSuggestions,
    monitor
} from "./utils";

const baseUrl = "http://bvg-hafas-rest-endpoint.hafas-rest-endpoint.159.69.189.191.xip.io/";

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
            platform: departure.line.platform,
            platformTitle: "Gleis", // Bvg departure platforms are mostly null when not being a train/subway
            line: departure.line.name,
            direction: departure.direction,
            fahrtNr: departure.line.fahrtNr,
            cancelled: departure.cancelled || false,
            when: departure.when || departure.scheduledWhen,
            tripId: departure.tripId
        };

        newDeparture.icon = getDepartureIcon(departure.line.product);
        newDeparture.arrivalTime = dateToHHMM(departure.when !== null ? departure.when : departure.scheduledWhen);
        newDeparture.arrivalTimeRelative = departure.when !== null ? parseRelativeTime(departure.when) : parseRelativeTime(departure.scheduledWhen);

        departures[i] = newDeparture;
    }
    dispatch({type: "SET_DEPARTURES", departures: departures});
}
