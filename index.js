const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./controllers');
const port = 8000;
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/channels', db.getChannels);
// app.get('/channels/:id', db.getChannelById);
app.post('/channels', db.createChannel);
// app.put('/channels/:id', db.updateChannel);
// app.delete('/channels/:id', db.deleteChannel);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
