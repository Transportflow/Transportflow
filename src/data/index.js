import {format as $format} from 'svelte-i18n'
import {getRegions} from "./regions";
import {getStops, getNearbyStops, getDepartures, getUpcomingStops, getWagenreihung} from "./query";
import {relativeTime, relativeToTime, clockTime} from "./time";

import axios from "axios";

axios.defaults.baseURL = localStorage.getItem("baseURL") || process.env.BACKEND_URL;

let format
$format.subscribe(f => format = f)

function REGION_NOT_AVAILABLE() {
    return format('utility.modals.region_not_available')
}
function NETWORK_ERROR() {
    return format('utility.modals.network_error')
}

function getAxios() {
    return axios;
}

export {
    REGION_NOT_AVAILABLE,
    NETWORK_ERROR,
    getAxios,
    getRegions,
    getStops,
    getNearbyStops,
    getDepartures,
    getUpcomingStops,
    getWagenreihung,
    relativeTime,
    relativeToTime,
    clockTime
};
