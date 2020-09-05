import {getRegions} from "./regions";
import {getStops, getNearbyStops, getDepartures, getUpcomingStops, getWagenreihung} from "./query";
import {relativeTime, relativeToTime, clockTime} from "./time";

import axios from "axios";
axios.defaults.baseURL = process.env.BACKEND_URL;

export let REGION_NOT_AVAILABLE = "<b>Region nicht verfügbar</b><br/>Bitte wählen Sie Ihre Region in den Einstellungen aus.";
export let NETWORK_ERROR = "<b>Netzwerkfehler</b><br/>Vergewissern Sie sich, dass ihr Gerät mit dem Internet verbunden ist.";

function getAxios() {
    return axios;
}

export {getAxios, getRegions, getStops, getNearbyStops, getDepartures, getUpcomingStops, getWagenreihung, relativeTime, relativeToTime, clockTime};