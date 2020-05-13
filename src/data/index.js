import {getRegions} from "./regions";

import axios from "axios";
axios.defaults.baseURL = "https://localhost:5678";

function getAxios() {
    return axios;
}

export {getAxios, getRegions};