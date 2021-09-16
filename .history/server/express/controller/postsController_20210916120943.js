const Posts = require("../model/index");
const { v4 } = require("uuid");

const postController = async (req, res) => {
  try {
    //find ALL stored data in DB
    const existsData = await Posts.find({});
    //if data already exists, then return existing data
    if (existsData.length) {
      return res.json(existsData);
    }
    //no data is stored, creates new data
    const data = new Posts({
      title: "TITLE",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores perspiciatis ab dolore repellendus eius, deserunt est earum corrupti, laudantium nulla similique dicta quae cum neque ut necessitatibus veniam! Rem, excepturi.",
      slug: `title-${v4()}`,
      comments: [],
    });
    //stores newly created data
    const savedData = await data.save();
    //returns newly created data
    return res.json([savedData]);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const postPostController = async (req, res) => {
  try {
    const body = req.body;
    const newData = await Posts(body).save();
  } catch (error) {}
};

module.exports = { postController };
