const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    project: "InfinityLinks",
    status: "running"
  });
});

module.exports = app;