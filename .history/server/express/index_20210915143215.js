const express = require("express");
const serverless = require("serverless-http");
//database stuff
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8888;
//routers
const { postRouter } = require("./router/routerCollection");

const app = express();

//middleware stuff
app.use(express.json());
app.use("/.netlify/functions/express/posts", postRouter);

app.get("/.netlify/functions/express", (req, res) => {
  res.json({ msg: "express connected" });
});

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  const db = await mongoose.connect(process.env.DB_URI);
  const result = await handler(event, context);
  return result;
};
