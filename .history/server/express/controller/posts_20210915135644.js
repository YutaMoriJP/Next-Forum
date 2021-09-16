const Post = require("../model/index");
const express = require("express");
const app = express();

app.get("/posts", async (req, res) => {
  const posts = new Post({
    title: "First Post",
    description: "First Post content. This is a default post",
    comments: [],
    slug: "first-post",
  });
  const posts = await posts.save();
});
