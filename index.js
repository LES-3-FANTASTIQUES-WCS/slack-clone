const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 8000;

require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'webapp', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'webapp', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
