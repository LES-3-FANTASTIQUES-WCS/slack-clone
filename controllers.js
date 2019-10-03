const dataAccess = require('./data-access');

const getChannels = async (_req, res) => {
  const channels = await dataAccess.getChannels();
  return res.status(200).json({ channels });
};

const createChannel = async (req, res) => {
  const channel = await dataAccess.createChannel();

  return res.status(201).send(`Channel added with ID: ${channel.id}`);
};

module.exports = {
  getChannels,
  createChannel,
};
