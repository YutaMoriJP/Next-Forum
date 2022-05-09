const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    creator: {
      type: String,
      required: true
    },
    postID: {
      type: String
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
