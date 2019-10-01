const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", function(req, res) {
  res.send("Hello W!");
});

app.listen(8000, function() {
  console.log("Example app listening on port 8000!");
});
