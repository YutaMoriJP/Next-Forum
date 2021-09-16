const Posts = require("../model/index");

const postController = async (req, res) => {
  try {
    //find ALL stored data in DB
    const existsData = await Posts.find({});
    //if data already exists, then return existing data
    if (existsData.length) {
      return res.json({ data: existsData, msg: "returned saved data..." });
    }
    //no data is stored, creates new data
    const data = new Posts({
      title: "TITLE",
      description: "DECSRIPTION",
      slug: `title-${v4()}`,
      comments: [],
    });
    //stores newly created data
    const savedData = await data.save();
    return res.json({ data: savedData, msg: "returning new data" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = { postController };
