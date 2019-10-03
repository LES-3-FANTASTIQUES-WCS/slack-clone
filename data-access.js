const pg = require('pg');
require('dotenv').config();
const databaseUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const getChannels = async (_req, res) => {
  const channels = await pool.query('SELECT * FROM channel ORDER BY id ASC');

  return channels.rows;
};

const createChannel = async (req, res) => {
  const name = req.body;
  console.log('data-access', req.body);

  const channel = await pool.query('INSERT INTO channel (name) VALUES ($1)', [
    name,
  ]);

  return channel;
};

module.exports = {
  getChannels,
  createChannel,
};
