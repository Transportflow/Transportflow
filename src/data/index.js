import {getRegions} from "./regions";
import {getStops, getNearbyStops, getDepartures, getUpcomingStops, getWagenreihung} from "./query";

import axios from "axios";
import {createMemorySource} from "svelte-routing/src/history";
axios.defaults.baseURL = "http://192.168.1.3:4567";

export let REGION_NOT_AVAILABLE = "<b>Region nicht verfügbar</b><br/>Bitte wählen Sie Ihre Region in den Einstellungen aus.";
export let NETWORK_ERROR = "<b>Netzwerkfehler</b><br/>Vergewissern Sie sich, dass ihr Gerät mit dem Internet verbunden ist.";

function getAxios() {
    return axios;
}

export {getAxios, getRegions, getStops, getNearbyStops, getDepartures, getUpcomingStops, getWagenreihung};