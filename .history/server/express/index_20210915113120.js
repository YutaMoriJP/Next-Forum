const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/.netlify/functions/express", (req, res) => {
  res.json({ msg: "express connected" });
});

module.exports.handler = serverless(app);
