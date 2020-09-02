import {getAxios, NETWORK_ERROR, REGION_NOT_AVAILABLE} from "./index";

export async function getStops(query, onError) {
    if (!localStorage.getItem("region")) {
        onError(REGION_NOT_AVAILABLE)
        return;
    }
    let response = await getAxios().get(`/${localStorage.getItem("region").toLowerCase()}/locations?query=${query}&stops=true`).catch(err => {
        if (err.message === "Network Error") {
            onError(NETWORK_ERROR);
            return;
        }
        if (err.response)
            onError("<b>" + err.response.data + "</b>")
        else
            onError("<b>" + err.message + "</b>")
    });
    return response.data;
}

export async function getNearbyStops(lat, lng, onError) {
    if (!localStorage.getItem("region")) {
        onError(REGION_NOT_AVAILABLE)
        return;
    }
    let response = await getAxios().get(`/${localStorage.getItem("region").toLowerCase()}/nearby?lat=${lat}&lng=${lng}&stops=true`).catch(err => {
        if (err.message === "Network Error") {
            onError(NETWORK_ERROR);
            return;
        }
        if (err.response)
            onError("<b>" + err.response.data + "</b>")
        else
            onError("<b>" + err.message + "</b>")
    });
    return response.data;
}

export async function getDepartures(city, stopId, onError) {

    let currentDate = new Date();
    let currentTime = currentDate.getTime();
    let localOffset = (-1) * currentDate.getTimezoneOffset() * 60000;
    let stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);

    let response = await getAxios().get(`/${city.toLowerCase()}/departures/${stopId}`).catch(err => { // ?when=${stamp} - removed temporarily, was causing issues
        if (err.message === "Network Error") {
            onError(NETWORK_ERROR);
            return;
        }
        if (err.response)
            onError("<b>" + err.response.data + "</b>")
        else
            onError("<b>" + err.message + "</b>")
    })
    if (!response) {
        onError("<b>Haltestelleninformationen aktuell nicht verfügbar</b>")
        return null;
    }
    console.log(response.data)
    return response.data;
}

export async function getUpcomingStops(city, tripId, currentStopId, lineName, when, relativeTo, onError) {
    let response = await getAxios().get(`/${city.toLowerCase()}/upcoming/${tripId}?currentstopid=${currentStopId}&linename=${lineName}&when=${when}&relativeto=${relativeTo}`).catch(err => {
        if (err.message === "Network Error") {
            onError(NETWORK_ERROR);
            return;
        }
        if (err.response)
            onError("<b>" + err.response.data + "</b>")
        else
            onError("<b>" + err.message + "</b>")
    })
    if (!response) {
        onError("<b>Weitere Haltestelleninformationen aktuell nicht verfügbar</b>")
        return null;
    }
    return response.data;
}

export async function getWagenreihung(lineName, plannedDeparture, onError) {
    if (lineName.includes("RE") || lineName.includes("RB") || lineName.includes("S") || lineName.includes("U") || lineName.toLowerCase().includes("tram")) {
        onError("Train not applicable")
        return null;
    }
    let response = await getAxios().get(`/deutsche bahn/wagenreihung/${lineName}?when=${plannedDeparture}`).catch(err => {
        if (err.message === "Network Error") {
            onError(NETWORK_ERROR);
            return;
        }
        if (err.response)
            onError("<b>" + err.response.data + "</b>")
        else
            onError("<b>" + err.message + "</b>")
    })
    if (!response) {
        onError("<b>Wagenreihung aktuell nicht verfügbar</b>")
        return null;
    }

    let d = response.data.data.istformation;

    let wagons = [];
    for (const i in d.allFahrzeuggruppe) {
        for (const w of d.allFahrzeuggruppe[i].allFahrzeug) {
            wagons.push(createWagon(w, +i))
        }
    }

    return ({
        initializationDate: response.data.meta.created,
        product: d.zuggattung,
        trainNumber: d.zugnummer,
        serviceId: d.serviceid,
        wagons
    })
}

let createWagon = (w, group) => ({
    group,
    type: w.kategorie,
    id: w.fahrzeugnummer,
    wagonNumber: +w.wagenordnungsnummer || null,
    fahrzeugsektor: w.fahrzeugsektor,
    status: w.status
    // todo: other attributes
});