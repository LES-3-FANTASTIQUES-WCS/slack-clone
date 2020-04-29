const pg = require('pg');
const { UnknownError } = require('./utils');

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

const getMessagesByChannel = async (channelId, offset) => {
  const messages = await pool.query(
    `SELECT message.id, text, message.created_at, channel_id, users.username, extra_info, COUNT(*) OVER() AS total_count  FROM message
     JOIN users
      ON message.user_id = users.id
      WHERE message.channel_id = $1 
      ORDER BY message.created_At DESC
      LIMIT 10 OFFSET $2;`,
    [channelId, offset]
  );
  return {
    messages: messages.rows,
    totalCount: messages.rows.length ? messages.rows[0].total_count : 0,
  };
};

const createMessage = async (text, channelId, userId) => {
  const result = await pool.query(
    'INSERT INTO message (text, channel_id, user_id) VALUES($1, $2, $3)  RETURNING *',
    [text, channelId, userId]
  );
  return result.rows[0];
};

const getMessage = async messageId => {
  const result = await pool.query(
    `
    SELECT
      message.id, 
      text, 
      channel_id, 
      message.created_at, 
      users.username,
      message.user_id,
      extra_info
    FROM message
    JOIN users
    ON users.id = message.user_id
    WHERE message.id = $1
  `,
    [messageId]
  );
  if (!result.rows.length) {
    return null;
  }
  return result.rows[0];
};

const deleteMessage = async id => {
  await pool.query(`DELETE FROM message WHERE id = $1`, [id]);
};

const createUser = async (username, password) => {
  try {
    await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, crypt($2, gen_salt('bf')))`,
      [username, password]
    );
  } catch (error) {
    // Postgres UNIQUE VIOLATION
    if (error.code === '23505') {
      throw new Error('Username is already taken.');
    }
    throw new UnknownError();
  }
};

const getVerifiedUserId = async (username, password) => {
  const result = await pool.query(
    'SELECT id FROM users WHERE username = $1 AND password = crypt($2, password)',
    [username, password]
  );
  return result.rows[0].id;
};

const createSession = async userId => {
  const result = await pool.query(
    'INSERT INTO session (user_id) VALUES ($1) RETURNING session_id',
    [userId]
  );
  return result.rows[0].session_id;
};

const deleteSession = async sessionId => {
  await pool.query('DELETE FROM session WHERE session_id = $1', [sessionId]);
};

const getUserFromSessionId = async sessionId => {
  const result = await pool.query(
    `
    SELECT users.id AS id, username FROM users
      JOIN session
      ON session.user_id = users.id
    WHERE session.session_id = $1
    `,
    [sessionId]
  );
  const user = result.rows[0];
  if (!user) {
    throw new Error('User is not authenticated.');
  }
  return user;
};

module.exports = {
  getChannels,
  getChannelByName,
  createChannel,
  getMessagesByChannel,
  createMessage,
  deleteMessage,
  createUser,
  createSession,
  deleteSession,
  getVerifiedUserId,
  getUserFromSessionId,
  getMessage,
};
