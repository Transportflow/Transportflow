import {getAxios} from "./index";

export async function getStops(query, onError) {
    let response = await getAxios().get(`/${localStorage.getItem("region").toLowerCase()}/locations?query=${query}&stops=true`).catch(err => {
        if (err.message === "Network Error") {
            onError("<b>Netzwerkfehler</b><br/>Vergewissern Sie sich, dass ihr Gerät mit dem Internet verbunden ist.");
            return;
        }
        onError("<b>"+err.message+"</b>")
    });
    return response.data;
}

export async function getNearbyStops(lat, lng, onError) {
    let response = await getAxios().get(`/${localStorage.getItem("region").toLowerCase()}/nearby?lat=${lat}&lng=${lng}&stops=true`).catch(err => {
        if (err.message === "Network Error") {
            onError("<b>Netzwerkfehler</b><br/>Vergewissern Sie sich, dass ihr Gerät mit dem Internet verbunden ist.");
            return;
        }
        onError("<b>"+err.message+"</b>")
    });
    return response.data;
}