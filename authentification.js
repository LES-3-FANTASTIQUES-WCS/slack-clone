/* eslint-disable camelcase */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

const user = { username: 'wcs', password: 'mkt' };

const private_key = 'wcs2019';

const token = jwt.sign(user, private_key, {
  expiresIn: '4s',
});

console.log(token);

setTimeout(() => {
  const data = jwt.verify(token, private_key);
  console.log(data);
}, 6000);
