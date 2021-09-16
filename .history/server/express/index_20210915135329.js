const express = require("express");
const serverless = require("serverless-http");
//database stuff
const mongoose = require("mongoose");
//Post Schema
const Post = require("./model/index");

const PORT = process.env.PORT || 8888;

const app = express();

//middleware stuff
app.use(express.json());

app.get("/.netlify/functions/express", (req, res) => {
  res.json({ msg: "express connected" });
});

//mongoose.connect is an asynchronous task that takes time, so it returns a promise
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(result => {
    console.log("connected to db");
    app.listen(PORT, () =>
      console.log(`Server is up and running in port ${PORT}`)
    );
  })
  .catch(err => console.log(err));

module.exports.handler = serverless(app);
