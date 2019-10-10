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
  return db.runSql(`INSERT INTO message (text, channel_id, user_id) VALUES
    ('Channel1_Message2', 1, 2),
    ('Channel1_Message2', 1, 1),
    ('Channel2_Message1', 2, 2),
    ('Channel2_Message2', 2, 1)
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1,
};
