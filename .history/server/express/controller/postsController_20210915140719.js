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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis deleniti quas rem, hic inventore atque dolor sapiente deserunt quibusdam facilis mollitia voluptas molestias sequi distinctio enim architecto eum blanditiis quasi.",
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
