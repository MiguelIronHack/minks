const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: String,
  message: String
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
