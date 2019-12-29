const createClient = require('hafas-client');
const dbProfile = require('hafas-client/p/db');

// create a client with Deutsche Bahn profile
const client = createClient(dbProfile, 'my-awesome-program');



//client.locations("Berlin Hbf").then(console.log);
/*client.departures({
       type: 'location',
       id: '8011160',
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

