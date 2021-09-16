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

//mongoose.connect is an asynchronous task that takes time, so it returns a promise
mongoose
  .connect(
    "mongodb+srv://yutamori:6PHgL3QcR8VZtc9@cluster0.mq0ks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(result => {
    console.log("connected to db");
    app.listen(PORT, () =>
      console.log(`Server is up and running in port ${PORT}`)
    );
  })
  .catch(err => {
    console.log("db id", process.env.DB_URI);
    console.log(err);
  });

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  const db = await mongoose.connect(process.env.DB_URI);
  const result = await handler();
};
