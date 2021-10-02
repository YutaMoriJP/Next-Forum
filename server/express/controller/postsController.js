const Posts = require("../model/index");
const { v4 } = require("uuid");
const CryptoJS = require("crypto-js");

const encrypt = postID => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(postID));
};

//GET - controller called to fetch ALL posts
const postGetController = async (req, res) => {
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
      creator: "Annonymous",
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
    //use title string to create slug for the newly created post
    //postID could be undefined if user is annonymous
    const { title, postID: userID } = body;
    //if id is undefined, then postID is {} and will not be added to newData object
    //if it's truthy, then a new {postID} object is created
    //and the userID is encrypted
    const postID = userID ? { postID: encrypt(userID) } : {};
    //remove ? from slug, or else it becomes a query string if title ends with ?
    const slug = `${title.replace(/\?/g, "")}-${v4()}`;
    //post object looks like {title:string, content:string, creator:string, comment:[],postID?:string}
    const newData = { ...body, ...postID, slug, comments: [] };
    const data = await Posts(newData).save();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//called when PUT request is sent, for now only comments field is updated (a new comment is submitted)
//but later, when user authentication is added, will allow for post update, but only for the content and NOT the title
const postPutController = async (req, res) => {
  //if true, then put request is for updating content
  const postUpdated = req.query.postUpdated;

  //ifpostUpdated is true, then it's for updating the post content(title/content)
  if (postUpdated) {
    const userID = req.query.userID;
    const postID = encrypt(userID);
    const _id = req.query._id;
    const main = req.query.main;
    try {
      //gets updated content
      const updatedContent = req.body;
      //find and update
      await Posts.find({ postID, _id }).update(updatedContent);
      //if main is false, then [slug].tsx sent the put request
      if (main === "false") {
        //in slug, single object needs to be fetched
        const [updatedPost] = await Posts.find({ _id }).exec();
        res.json(updatedPost);
        return;
      }
      //if this block runs, then main page sent the put request
      //and all the content is needed
      const updatedPosts = await Posts.find({}).sort({ updatedAt: "desc" });
      res.json(updatedPosts);
      return;
    } catch (error) {
      res.json({ error: error.message });
      return;
    }
  }
  //if this block runs, then it's for updating the comment, make new comment
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

module.exports = { postGetController, postPostController, postPutController };
