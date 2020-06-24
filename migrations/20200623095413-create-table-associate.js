'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.runSql(
    `CREATE TYPE user_channel_permission_role AS ENUM ('admin', 'standard')`
  );
  return db.runSql(`CREATE TABLE user_channel_permission (
    user_id INT NOT NULL,
    channel_id INT NOT NULL,
    role user_channel_permission_role NOT NULL DEFAULT 'standard',
    CONSTRAINT primary_key_asso PRIMARY KEY (user_id, channel_id),
    CONSTRAINT users_foreign_key FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT channel_foreign_key FOREIGN KEY (channel_id) REFERENCES channel (id)
  )`);
};

exports.down = function(db) {
  return db.runSql('DROP TABLE user_channel_permission');
};

exports._meta = {
  version: 1,
};
