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

exports.up = function(db) {
  return db.runSql(`CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS users`);
};

exports._meta = {
  version: 1,
};
