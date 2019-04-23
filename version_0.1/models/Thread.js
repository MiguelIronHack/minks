const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  message: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  title: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  category: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
