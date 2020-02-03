require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const routes = require('./routes');
const { setUser } = require('./middlewares');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setUser);

app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'webapp', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'webapp', 'build', 'index.html'));
});
module.exports = app;
