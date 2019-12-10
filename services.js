const crypto = require('crypto');
const dataAccess = require('./data-access');

const createChannelAndGetId = async name => {
  await dataAccess.createChannel(name);
  const channel = await dataAccess.getChannelByName(name);

  return channel.id;
};

const hashUserPassword = async password => {
  const hash = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  return hash;
};

module.exports = {
  createChannelAndGetId,
  hashUserPassword,
};
