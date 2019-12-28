const axios = require("axios").default;

const baseUrl = "https://api.transportflow.online";

export async function findSuggestions(input, dispatch) {
    const raw = await axios.get(baseUrl + "/locations?query=" + input + "&addresses=false&poi=false").catch((err) => {
        if (!err.toString().includes("500") || !err.toString().includes("502")) {
            throw new Error(err.toString());
        }
    });
    let query = raw.data;

    await parseSuggestions(query, dispatch)
}

export async function findLocationSuggestions(latitude, longitude, dispatch) {
    const raw = await axios.get(baseUrl + "/stops/nearby?latitude=" + latitude + "&longitude=" + longitude);
    const query = raw.data;

    await parseSuggestions(query, dispatch);
}

async function parseSuggestions(query, dispatch) {
    await getBVGIcons(query);

    // parse query in unified format
    let suggestions = [];
    for (let i = 0; i < query.length; i++) {
        suggestions.push({id: query[i].id, name: query[i].name, icons: query[i].icons});
    }

    dispatch({type: "SET_SUGGESTIONS", suggestions: suggestions});
}

async function getBVGIcons(stops) {
    stops.forEach(stop => {
        stop.icons = [];
        if (stop.products.subway)
            stop.icons.push("https://upload.wikimedia.org/wikipedia/commons/a/a3/U-Bahn.svg");
        if (stop.products.bus)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-bus.svg");
        if (stop.products.tram)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-tram.svg");
        if (stop.products.suburban)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg");
        if (stop.products.express)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-train.svg");
        if (stop.products.ferry)
            stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg");
        if (stop.products.regional)
            stop.icons.push("https://upload.wikimedia.org/wikipedia/commons/a/a6/VBB_Bahn-Regionalverkehr.svg");
    });
}