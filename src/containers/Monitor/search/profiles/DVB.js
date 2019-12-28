import * as dvb from "dvbjs";

export async function findSuggestions(input, dispatch) {
    let query = await dvb.findStop(input, 8000).catch((err) => {
        throw new Error(err.toString());
    });
    query.splice(7);
    await parseSuggestions(query, dispatch);
}

export async function findLocationSuggestions(latitude, longitude, dispatch) {
    const query = await dvb.findAddress(
        longitude,
        latitude, 8000
    ).catch((err) => {
        throw new Error(err.toString());
    });
    parseSuggestions(query.stops, dispatch);
}

async function parseSuggestions(query, dispatch) {
    try {
        await getDVBIcons(query);
    } catch (err) {
        throw new Error(err.toString())
    }

    // parse query in unified format
    let suggestions = [];
    for (let i = 0; i < query.length; i++) {
        suggestions.push({id: query[i].id, name: query[i].name + ", " + query[i].city, icons: query[i].icons});
    }

    dispatch({type: "SET_SUGGESTIONS", suggestions: suggestions});
}

async function getDVBIcons(stops) {
    for (let stop of stops) {
        let lines = await dvb.lines(stop.id).catch((error) => {
            throw error;
        });

        stop.icons = [];
        lines.forEach((line,) => {
            if (stop.icons.indexOf(line.mode.iconUrl) === -1)
                stop.icons.push(line.mode.iconUrl);
        });
    }
}