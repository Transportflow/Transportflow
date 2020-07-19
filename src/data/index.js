import {getRegions} from "./regions";
import {getStops, getNearbyStops} from "./query";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:4567";

function getAxios() {
    return axios;
}

export {getAxios, getRegions, getStops, getNearbyStops};