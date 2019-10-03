const dataAccess = require('./data-access');
const services = require('./services');

const getChannels = async (_req, res) => {
  const channels = await dataAccess.getChannels();
  return res.status(200).json({ channels });
};

const createChannel = async (req, res) => {
  const { name } = req.body;

  const channelId = await services.createChannelAndGetId(name);

  return res.status(201).send(`Channel added with ID: ${channelId}`);
};

module.exports = {
  getChannels,
  createChannel,
};
