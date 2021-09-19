const Posts = require("../model/index");
const { v4 } = require("uuid");

//controller called to fetch ALL posts
const postController = async (req, res) => {
  try {
    //find ALL stored data in DB
    //sort({updated:'desc'}) sorts data by desc order by the updatedAt property
    const existsData = await Posts.find({}).sort({ updatedAt: "desc" });
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

//called when POST request is sent i.e. a new post is created from the client side
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

//called when PUT request is sent, for now only comments field is updated (a new comment is submitted)
//but later, when user authentication is added, will allow for post update, but only for the content and NOT the title
const postPutController = async (req, res) => {
  try {
    const id = req.query.id; //obtains query string http://api.com?id=1234, id = 1234
    const comments = req.body; //obtains request body, i.e. fetch(url, {body: comments}), body = [{comment:'hi', id:1234, date:'09/19/2021'}]
    // const comments = body;
    const data = await Posts.findByIdAndUpdate(id, { comments }, { new: true });
    //const data = await Posts.findById(id);
    //finds the data with the given id and updates it with the data
    //const updatedUsers = await User.findByIdAndUpdate(id, req.body, { new: true,});
    //const data = await Posts.findById(id);
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { postController, postPostController, postPutController };
