const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // Post ID will be stored in the Thread Collection as an Array of Id's
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
