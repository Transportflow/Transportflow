import {getAxios, NETWORK_ERROR} from "./index";

export async function getRegions(onError) {
    let response = await getAxios().get("/providers").catch(err => {
        if (err.message === "Network Error") {
            onError(NETWORK_ERROR());
            return;
        }
        onError("<b>"+err.message+"</b>")
    });
    return response.data;
}
