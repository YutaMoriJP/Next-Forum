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
    const { title } = body;
    const slug = `${title}-${v4()}`;
    const newData = { ...body, slug, comments: [] };
    const data = await Posts(newData).save();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const postPutController = async (req, res) => {
  try {
    const id = req.query.id;
    const body = req.body;
    const comments = body;
    const data = await Posts.findByIdAndUpdate(id, { comments }, { new: true });
    //const data = await Posts.findById(id);
    //finds the data with the given id and updates it with the data
    //const updatedUsers = await User.findByIdAndUpdate(id, req.body, { new: true,});
    //    const data = await Posts.findById(id);
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { postController, postPostController, postPutController };
