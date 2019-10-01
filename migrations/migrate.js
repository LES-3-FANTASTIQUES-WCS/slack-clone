const pool = require("../db_pool");
const queries = [];

pool.connect().then((client) => {
  return client
    .query(
      `CREATE TABLE channel(
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
      )`
    )
    .then(() => {
      console.log("Migration successful!!");
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
});
