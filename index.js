const express = require('express');
const bodyParser = require('body-parser');
const db = require('./controllers');

const app = express();
const port = 8000;
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/channels', db.getChannels);
app.post('/channels', db.createChannel);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app;
