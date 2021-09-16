const Post = require("../model/index");
const express = require("express");
const app = express();

app.get("/posts", (req, res) => {
  const posts = new Post({ title: "First Post" });
});
