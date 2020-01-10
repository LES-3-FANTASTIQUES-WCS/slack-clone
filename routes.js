/* eslint-disable dot-notation */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */

require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Cookies = require('universal-cookie');
const controllers = require('./controllers');

const cookies = new Cookies();

function authenticate(req, res, next) {
  // const auth = req.headers['authorization'];
  const auth = cookies.get('accessToken');
  console.log('authCookie', auth);
  const token = auth && auth.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/channels', authenticate, controllers.getChannels);

router.post('/channels', authenticate, controllers.createChannel);

router.get(
  '/channels/:channelId/messages',
  authenticate,
  controllers.getMessagesByChannelId
);

router.post(
  '/channels/:channelId/messages',
  authenticate,
  controllers.createMessage
);

let refreshTokens = [];

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1500s' });
}

router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.sendStatus(401);
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

router.post('/login', (req, res) => {
  const { username } = req.body;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  cookies.set('accessToken', accessToken);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
  cookies.set('refreshToken', refreshToken);
  console.log(1, cookies.get('accessToken'), 2, cookies.get('refreshToken'));
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204);
});

module.exports = router;
