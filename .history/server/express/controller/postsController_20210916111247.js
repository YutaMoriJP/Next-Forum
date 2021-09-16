const Post = require("../model/index");

const postController = async (req, res) => {
  try {
    const existsData = await Posts.find({});
    if (existsData.length) {
      return res.json({ data: existsData, msg: "returned saved data..." });
    }
    const data = new Posts({
      title: "TITLE",
      description: "DECSRIPTION",
      slug: `title-${v4()}`,
      comments: [],
    });
    const savedData = await data.save();
    return res.json({ data: savedData, msg: "returning new data" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = { postController };
