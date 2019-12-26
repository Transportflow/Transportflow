const axios = require("axios").default;

const baseUrl = "https://api.transportflow.online";

export async function findDeparturesForBVG() {
    this.setState({loading: true});
    if (!this.state.stopName) {
        return;
    }
    const raw1 = await axios.get(baseUrl + "/stops/" + this.state.stopName).catch((err) => {
        throw new Error(err.name + ": " + err.message);
    });
    const stop = raw1.data;
    if (stop === undefined) {
        return
    }

    setState({
        latitude: stop.location.latitude,
        longitude: stop.location.longitude,
        stop: stop
    });


    const raw2 = await axios.get(baseUrl + "/stops/" + this.state.stopName + "/departures?duration=65").catch((err) => {
        this.setState({err: err.name + ": " + err.message, loading: false});
    });
    const monitor = raw2.data;
    if (monitor.length === 0) {
        throw new Error("Fehler: Keine Abfahrten gefunden");
    }
    var allModes = [];
    monitor.forEach((departure, index) => {
        if (allModes.indexOf(departure.line.product) === -1)
            allModes.push(departure.line.product)
    });
    if (this.state.err === "") {
        setState({
            allModes: Object.assign([], allModes),
            departures: monitor,
            loading: false
        });
    }
    this.forceUpdate();
}