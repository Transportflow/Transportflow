import * as dvb from "dvbjs";

export async function findDeparturesForDVB() {
    this.setState({loading: true});
    if (!this.state.stopName) {
        return;
    }
    var stop = await dvb.findStop(this.state.stopName);
    if (stop.length === 0) {
        throw new Error("Haltestelle nicht gefunden");
    }
    var query = await dvb.monitor(stop[0].id, 0, 30).catch(error => {
        this.setState({err: error.name + ": " + error.message, loading: false});
    });
    if (this.state.err === "") {
        const mot = [];
        query.forEach(departure => {
            var toPush = "";
            if (!departure.mode.title.includes("undefined")) {
                toPush = departure.mode.title;
                if (
                    toPush !== "" &&
                    mot.indexOf(toPush) === -1 &&
                    departure.arrivalTimeRelative > -1
                ) {
                    mot.push(toPush);
                }
            }
        });
        // update State
    }
}