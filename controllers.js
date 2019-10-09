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

const getMessagesByChannelId = async (req, res) => {
  const { channelId } = req.params;

  const messages = await dataAccess.getMessagesByChannel(channelId);

  return res.status(200).json({ messages });
};

const createMessage = async (req, res) => {
  const { text, channelId, userId } = req.body;

  await dataAccess.createMessage(text, channelId, userId);

  return res.status(201);
};

module.exports = {
  getChannels,
  createChannel,
  getMessagesByChannelId,
  createMessage,
};
