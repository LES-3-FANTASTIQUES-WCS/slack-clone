const express = require('express');
const app = express();
const connection = require('./db_pool');
require('dotenv').config();

app.get('/', function(req, res) {
  res.send('Hello W!');
});

app.get('/channels', function(req, res) {
  connection.query('SELECT * FROM channel', null, (err, results) => {
    if (err) {
      res
        .status(400)
        .json({ message: 'Erreur lors de la récupération des channels' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/channels', function(req, res) {
  const db_name = req.body;
  console.log(req.body);
  connection.query(
    'INSERT INTO channel (name) VALUES ?',
    db_name,
    (err, results) => {
      if (err) {
        res.status(400);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// app.use('/channels', channelsRoute);

app.listen(8000, function() {
  console.log('Example app listening on port 8000!');
});

module.exports = app;
