const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
