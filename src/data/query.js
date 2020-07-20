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
            onError("<b>"+err.response.data+"</b>")
        else
            onError("<b>"+err.message+"</b>")
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
            onError("<b>"+err.response.data+"</b>")
        else
            onError("<b>"+err.message+"</b>")
    });
    return response.data;
}