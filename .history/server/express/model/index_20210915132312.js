const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: { type: Array, required: true },
  slug: { type: string, required: true },
});

const userSchema = new Schema({
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "10m" },
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});
