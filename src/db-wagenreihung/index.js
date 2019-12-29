const axios = require('axios').default;
const moment = require('moment-timezone');

const createWagon = (w, group) => ({
    group,
    type: w.kategorie,
    id: w.fahrzeugnummer,
    wagonNumber: +w.wagenordnungsnummer || null,
    fahrzeugsektor: w.fahrzeugsektor,
    status: w.status
    // todo: other attributes
});

// todo: validate params

const wagenreihung = async (trainNumber, lastDeparture) => {
    const date = moment.tz(lastDeparture, 'Europe/Berlin').format('YYYYMMDDHHmm');
    let catchError = false;
    const data = await axios.get(`https://www.apps-bahn.de/wr/wagenreihung/1.0/${trainNumber}/${date}`).catch(() => catchError = true).then(res => res.data);

    if (catchError) {
        return "error";
    }

    const d = data.data.istformation;

    const wagons = [];
    for (const i in d.allFahrzeuggruppe) {
        for (const w of d.allFahrzeuggruppe[i].allFahrzeug) {
            wagons.push(createWagon(w, +i))
        }
    }

    return ({
        initializationDate: data.meta.created,
        product: d.zuggattung,
        trainNumber: d.zugnummer,
        serviceId: d.serviceid,
        wagons
    })
}

module.exports = wagenreihung;