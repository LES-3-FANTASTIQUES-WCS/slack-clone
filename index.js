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
// app.get('/channel/:id', db.getChannelById);
app.post('/channel', db.createChannel);
// app.put('/channel/:id', db.updateChannel);
// app.delete('/channel/:id', db.deleteChannel);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
