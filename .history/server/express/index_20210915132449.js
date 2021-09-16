const express = require("express");
const serverless = require("serverless-http");
//database stuff
const mongoose = require("mongoose");
const app = express();

app.get("/.netlify/functions/express", (req, res) => {
  res.json({ msg: "express connected" });
});

module.exports.handler = serverless(app);
