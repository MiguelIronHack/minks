const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SoundBankSchema = new Schema({
  name: String,
  url: String
});
const SoundBank = mongoose.model("SoundBank", SoundBankSchema);

module.exports = SoundBank;
