const express = require("express");
const serverless = require("serverless-http");
//database stuff
const mongoose = require("mongoose");
//routers
//const { postRouter } = require("./router/routerCollection");

const app = express();

//middleware stuff
app.use(express.json());
//app.use("/.netlify/functions/express/posts", postRouter);

app.get("/.netlify/functions/express", (req, res) => {
  res.json({ msg: "express connected" });
});

module.exports.handler = serverless(app);