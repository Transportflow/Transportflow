const createClient = require('hafas-client');
const dbProfile = require('hafas-client/p/db');

// create a client with Deutsche Bahn profile
const client = createClient(dbProfile, 'my-awesome-program');

const wagenreihung = require('db-wagenreihung');

client.locations("Berlin Hauptbahnhof (S+U), Berlin").then(console.log);
/*client.departures({
       type: 'location',
       id: '978233',
       latitude: 51.065912,
       longitude: 13.740524
     }).then(console.log);*/

//       type: 'line',
//       id: 'mrb-34',
//       fahrtNr: '73886',
//       name: 'MRB 34',
//       public: true,
//       mode: 'train',
//       product: 'regional',
//       operator: [Object],
//       additionalName: 'MRB 34'

const trainNumber = 'mrb-34'; // train number without the trailing type ('372' instead of 'ICE 372')
const lastDeparture = new Date('2019-12-28T22:18:00+01:00'); // this train's last departure time (use db-train-numbers or db-hafas to get this information)

//wagenreihung(trainNumber, lastDeparture).then(console.log).catch(console.error);