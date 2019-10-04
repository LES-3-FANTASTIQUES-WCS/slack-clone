const express = require('express');
const app = express();
require('dotenv').config();

const routes = require('./routes');

app.use('/api', routes);

app.listen(8000, function() {
  console.log('Example app listening on port 8000!');
});
