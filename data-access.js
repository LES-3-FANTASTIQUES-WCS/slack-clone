const pg = require('pg');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const getChannels = async () => {
  const channels = await pool.query('SELECT * FROM channel ORDER BY id ASC');

  return channels.rows;
};

const getChannelByName = async name => {
  const result = await pool.query('SELECT * FROM channel WHERE name = $1', [
    name,
  ]);

  return result.rows[0];
};

const createChannel = async name => {
  await pool.query('INSERT INTO channel (name) VALUES ($1)', [name]);
};

const getMessagesByChannel = async channelId => {
  const messages = await pool.query(
    'SELECT * FROM message WHERE channel_id = $1 ORDER BY created_At ASC',
    [channelId]
  );

  return messages.rows;
};

const createMessage = async (text, channelId, userId) => {
  await pool.query(
    'INSERT INTO message (text, channel_id, user_id) VALUES($1, $2, $3)',
    [text, channelId, userId]
  );
};

const signupUser = async (username, email, hash, salt) => {
  await pool.query(
    'INSERT INTO user_account (username, email, hash, salt) VALUES($1, $2, $3, $4)',
    [username, email, hash, salt]
  );
};

const findUserAccount = async email => {
  const result = await pool.query(
    'SELECT * FROM user_account WHERE email = $1',
    [email]
  );

  return result.rows[0];
};

module.exports = {
  getChannels,
  getChannelByName,
  createChannel,
  getMessagesByChannel,
  createMessage,
  signupUser,
  findUserAccount,
};
