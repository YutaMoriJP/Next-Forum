const Post = require("../model/index");

const postController = async (req, res) => {
  try {
    const data = await Post.find().exec();
    if (data.length) {
      //sort from descending order await User.find().sort({ createdAt: -1 });
      const users = await User.find();
      res.json(users);
    } else {
      const newUser = await User({
        name: "name",
        username: "username",
        age: "age",
      }).save();
      res.json(newUser);
    }
  } catch (e) {
    res.sendStatus(500).send(e);
  }
};

module.exports = { postController };
