import {getRegions} from "./regions";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:4567";

function getAxios() {
    return axios;
}

export {getAxios, getRegions};