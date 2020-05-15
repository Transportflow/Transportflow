import {getAxios} from "./index";

export async function getLocations(onError) {
    // TODO
    let response = await getAxios().get("/providers").catch(err => {
        if (err.message === "Network Error") {
            onError("<b>Netzwerkfehler</b><br/>Vergewissern Sie sich, dass ihr Gerät mit dem Internet verbunden ist.");
            return;
        }
        onError("<b>"+err.message+"</b>")
    });
    return response.data;
}