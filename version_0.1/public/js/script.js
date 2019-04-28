import { MIDIController } from "./MIDI_controller.js";
import { KeyBoard } from "./user_interface.js";
import { Drums } from "./drum_machine.js";
const audioCtx = new AudioContext();
const synthNode = document.getElementById("synth-parent");
const midiController = new MIDIController(audioCtx);
const kickNode = document.getElementById("kick-section");
const snareNode = document.getElementById("snare-section");
const hiHatNode = document.getElementById("hi-hat-section");
const clapNode = document.getElementById("clap-section");
const volumeKnob = document.getElementById("volume-knob");
const modulationKnob = document.getElementById("modulation-knob");
const filterKnob = document.getElementById("filter-knob");
const synthTypeNode = document.getElementById("synth-type");
const serverUrl = document.getElementById("site-url").content;

const noteScale = [
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4"
];
let attack = 1;
let sustain = 1;
const keyBoard = new KeyBoard(noteScale);
synthTypeNode.onchange = function() {
  let type = synthTypeNode.value;
  keyBoard.setType(type.toLowerCase(), attack, sustain);
};

function createKnob(parentNode, value, min, max, type) {
  let knob = pureknob.createKnob(60, 60);
  knob.setProperty("angleStart", -0.75 * Math.PI);
  knob.setProperty("angleEnd", 0.75 * Math.PI);
  knob.setProperty("colorFG", "#88ff88");
  knob.setProperty("trackWidth", 0.4);
  knob.setProperty("valMin", min);
  knob.setProperty("valMax", max);
  knob.setValue(value);
  let listener = (knob, value) => {
    if (type === "volume") keyBoard.setVolume(value);
    if (type === "attack") keyBoard.setAttack(value / 10);
    if (type === "sustain") keyBoard.setSustain(value / 1000);
  };
  knob.addListener(listener);
  var node = knob.node();
  parentNode.appendChild(node);
}

createKnob(volumeKnob, 5, 0, 10, "volume");
createKnob(modulationKnob, 5, 0.1, 10, "attack");
createKnob(filterKnob, 5, 0.11, 1000, "sustain");

function createDrumElements(name, url) {
  axios
    .post(serverUrl + "/api/soundbank/create", { name, url })
    .then(serverRes => {
      console.log(serverRes.data);
    })
    .catch(err => console.log(err));
}
///////////////////////////////
//**  Populate dataBase   **//
/////////////////////////////
// createDrumElements(
//   "KICK",
//   "https://ia801507.us.archive.org/18/items/909KICK/909_KICK.wav"
// );
// createDrumElements(
//   "SNARE",
//   "https://ia601408.us.archive.org/34/items/909Snare/909_snare.wav"
// );
// createDrumElements(
//   "HI-HAT",
//   "https://ia601400.us.archive.org/4/items/909HighHat/909_HighHat.wav"
// );
// createDrumElements(
//   "Clap",
//   "https://ia801501.us.archive.org/31/items/909Clap/909_clap.wav"
// );

keyBoard.setKeyListeners(window);
keyBoard.setMouseListener(synthNode.children);
midiController
  .init(window.navigator)
  .then(
    midiController.onMIDISuccess.bind(midiController),
    midiController.onMIDIFailure.bind(midiController)
  );

function getDrumSound() {
  return axios.get(serverUrl + "/api/soundbank/all");
}

getDrumSound()
  .then(servRes => {
    try {
      const kickUrl = servRes.data[0].url;
      const kick = new Drums(kickNode, kickUrl, "kick", audioCtx);
      kick.startSequence(120);
      const snareUrl = servRes.data[2].url;
      const snare = new Drums(snareNode, snareUrl, "snare", audioCtx);
      snare.startSequence(120);
      const clapUrl = servRes.data[3].url;
      const clap = new Drums(clapNode, clapUrl, "clap", audioCtx);
      clap.startSequence(120);
      const hiHatUrl = servRes.data[1].url;
      const hiHat = new Drums(hiHatNode, hiHatUrl, "hiHat", audioCtx);
      hiHat.startSequence(120);
    } catch (e) {
      console.log(e);
    }
  })
  .catch(err => console.log(err));
