const createClient = require('hafas-client');
const dbProfile = require('hafas-client/p/db');

// create a client with Deutsche Bahn profile
const client = createClient(dbProfile, 'my-awesome-program');

//client.locations("Bhf Neustadt").then(console.log);
client.departures({
       type: 'location',
       id: '8010089',
       latitude: 51.065912,
       longitude: 13.740524
     }).then(console.log);