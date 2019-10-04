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
  const channel = await pool.query('SELECT * FROM channel WHERE name = $1', [
    name,
  ]);

  return channel.rows[0];
};

const createChannel = name => {
  pool.query('INSERT INTO channel (name) VALUES ($1)', [name]);
};

module.exports = {
  getChannels,
  getChannelByName,
  createChannel,
};