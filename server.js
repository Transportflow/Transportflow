const express = require('express');
const app = express();

app.get('/version', function (req, res) {
    return res.json({latestVersion: 0.5});
});

app.get('/', function (req, res) {
});

app.listen(4001);