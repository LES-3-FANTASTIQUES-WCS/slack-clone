const pg = require('pg');
const util = require('util');
const request = require('supertest');
// Use exec as a promise to be able to await it
const exec = util.promisify(require('child_process').exec);

const app = require('./app');
const dataAccess = require('./data-access');

const agent = request.agent(app);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const resetDatabase = async () => {
  await pool.query(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  `);
};

const migrateDatabase = async () => {
  const { stdout, stderr } = await exec('npm run migrate');
  // eslint-disable-next-line no-console
  console.log('migrateDatabase--stdout:', stdout);
  // eslint-disable-next-line no-console
  console.log('migrateDatabase--stderr:', stderr);
};

describe('App', () => {
  let myMessage;
  let mySessionId;
  let messageFromUser2;
  let myUserId;
  let user2Id;
  const channelId = 1;

  beforeEach(async () => {
    await resetDatabase();
    await migrateDatabase();
    await dataAccess.createUser('me', 'myPassword');
    await dataAccess.createUser('user2', 'myPassword');
    myUserId = await dataAccess.getVerifiedUserId('me', 'myPassword');
    user2Id = await dataAccess.getVerifiedUserId('user2', 'myPassword');
    mySessionId = await dataAccess.createSession(myUserId);
    myMessage = await dataAccess.createMessage(
      'myMessage',
      channelId,
      myUserId
    );
    messageFromUser2 = await dataAccess.createMessage(
      'message from user2',
      channelId,
      user2Id
    );
    await pool.query(
      `INSERT INTO user_channel_permission VALUES ($1, ${channelId})`,
      [myUserId]
    );
  });

  describe('GET /api/channels', () => {
    describe('when has permission for some channels', () => {
      it('responds with 200 and list of channels with permission', async () => {
        const response = await agent
          .get('/api/channels')
          .set('Cookie', `sessionId=${mySessionId}`);

        expect(response.status).toEqual(200);
        expect(response.body.channels.length).toEqual(1);
        expect(response.body.channels[0].channel_id).toEqual(channelId);
      });
    });
  });

  describe('GET /api/channels/:channelId/users', () => {
    describe('when users have permission on channel', () => {
      it('responds with 200 and list of users with permission', async () => {
        const response = await agent
          .get(`/api/channels/${channelId}/users`)
          .set('Cookie', `sessionId=${mySessionId}`);
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].id).toEqual(myUserId);
      });
    });
  });

  describe('DELETE /api/messages', () => {
    describe('when the user owns the message', () => {
      it('responds with 200 and deletes the message', async done => {
        const response = await agent
          .delete(`/api/messages/${myMessage.id}`)
          .set('Cookie', `sessionId=${mySessionId}`);
        expect(response.status).toEqual(200);
        expect(await dataAccess.getMessage(myMessage.id)).toEqual(null);
        done();
      });
    });

    describe('when the user does not own the message', () => {
      it('responds with 403 and does not delete the message', async done => {
        const response = await agent
          .delete(`/api/messages/${messageFromUser2.id}`)
          .set('Cookie', `sessionId=${mySessionId}`);
        expect(response.status).toEqual(403);
        expect(await dataAccess.getMessage(messageFromUser2.id)).toBeTruthy();
        done();
      });
    });

    describe('when the message does not exist', () => {
      it('responds with 404', async done => {
        const response = await agent
          .delete(`/api/messages/78`)
          .set('Cookie', `sessionId=${mySessionId}`);
        expect(response.status).toEqual(404);
        done();
      });
    });
  });
});
