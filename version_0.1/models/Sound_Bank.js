const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SoundBankSchema = new Schema({
  type: {
    type: String,
    enum: ["kick", "snare", "hi-hat", "clap"],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});
const SoundBank = mongoose.model("SoundBank", SoundBankSchema);

module.exports = SoundBank;
