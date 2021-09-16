const Post = require("../model/index");

app.get("/posts", async (req, res) => {
  const posts = new Post({
    title: "First Post",
    description: "First Post content. This is a default post",
    comments: [],
    slug: "first-post",
  });
  const POSTS = await posts.save();
  res.send(POSTS);
});
