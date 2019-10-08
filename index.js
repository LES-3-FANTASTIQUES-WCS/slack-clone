const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const routes = require('./routes');

const port = 8000;
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
