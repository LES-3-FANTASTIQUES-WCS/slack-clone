const crypto = require('crypto');
const dataAccess = require('./data-access');

const createChannelAndGetId = async name => {
  await dataAccess.createChannel(name);
  const channel = await dataAccess.getChannelByName(name);

  return channel.id;
};

const hashUserPassword = async password => {
  const salt = crypto.randomBytes(16).toString('hex');

  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');

  return { hash, salt };
};

const validateUserPassword = (inputPassword, dbSalt, dbHash) => {
  const hashInput = crypto
    .pbkdf2Sync(inputPassword, dbSalt, 10000, 512, 'sha512')
    .toString('hex');

  return hashInput === dbHash; // IF it returns true then they match
};

module.exports = {
  createChannelAndGetId,
  hashUserPassword,
  validateUserPassword,
};
