const Post = require("../model/index");

const postController = async (req, res) => {
  try {
    const data = await Post.find().exec();
    if (data.length) {
      //sort from descending order await User.find().sort({ createdAt: -1 });
      const users = await Post.find();
      res.json(users);
    } else {
      const posts = await new Post({
        title: "First Post",
        description: "First Post content. This is a default post",
        comments: [],
        slug: "first-post",
      }).save();
      res.json(posts);
    }
  } catch (e) {
    res.sendStatus(500).send(e);
  }
};

module.exports = { postController };
