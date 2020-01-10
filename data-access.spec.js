const pg = require('pg');
const util = require('util');
// Use exec as a promise to be able to await it
const exec = util.promisify(require('child_process').exec);

const dataAccess = require('./data-access');

const resetDatabase = async () => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  await pool.query(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  `);
};

const migrateDatabase = async () => {
  const { stdout, stderr } = await exec('npm run migrate');
  console.log('migrateDatabase--stdout:', stdout);
  console.log('migrateDatabase--stderr:', stderr);
};

describe('getChannels', () => {
  beforeAll(async () => {
    await resetDatabase();
    await migrateDatabase();
  });

  it('returns all channels', async () => {
    const channels = await dataAccess.getChannels();
    expect(channels.map(channel => channel.name)).toMatchInlineSnapshot(`
      Array [
        "general",
        "random",
      ]
    `);
  });
});

describe('getChannelByName', () => {
  describe('when passed name', () => {
    it('returns matching channel', async () => {
      expect(
        (await dataAccess.getChannelByName('general')).name
      ).toMatchInlineSnapshot(`"general"`);
    });
  });
});

describe('createChannel', () => {
  describe('when passed name', () => {
    it('creates channel with name', async () => {
      const channelName = 'wilder';
      await dataAccess.createChannel(channelName);
      expect(
        (await dataAccess.getChannelByName(channelName)).name
      ).toMatchInlineSnapshot(`"wilder"`);
    });
  });
});
