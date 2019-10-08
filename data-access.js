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

module.exports = {
  getChannels,
  getChannelByName,
  createChannel,
};
