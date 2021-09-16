const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: "First Post",
  description:
    "First Post of the Forum. This is the default post that will be seen by all users",
});
