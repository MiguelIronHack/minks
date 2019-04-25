import { MIDIController } from "./MIDI_controller.js";
import { KeyBoard } from "./user_interface.js";
import { Drums } from "./drum_machine.js";
const audioCtx = new AudioContext();
const synthNode = document.getElementById("synth-parent");
const midiController = new MIDIController(audioCtx);

const kickNode = document.getElementById("kick-section");
const snareNode = document.getElementById("snare-section");
// const kickNode = document.getElementById("kick-section");
// const kickNode = document.getElementById("kick-section");
const volumeKnob = document.getElementById("volume-knob");
const modulationKnob = document.getElementById("modulation-knob");
const filterKnob = document.getElementById("filter-knob");
const synthTypeNode = document.getElementById("synth-type");

const serverUrl = "http://localhost:3434";

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
const keyBoard = new KeyBoard(noteScale);
synthTypeNode.onchange = function() {
  let type = synthTypeNode.value;
  keyBoard.setType(type.toLowerCase());
};

function createKnob(parentNode, value, min, max, type) {
  let knob = pureknob.createKnob(100, 100);
  knob.setProperty("angleStart", -0.75 * Math.PI);
  knob.setProperty("angleEnd", 0.75 * Math.PI);
  knob.setProperty("colorFG", "#88ff88");
  knob.setProperty("trackWidth", 0.4);
  knob.setProperty("valMin", min);
  knob.setProperty("valMax", max);
  knob.setValue(value);
  let listener = (knob, value) => {
    if (type === "volume") keyBoard.setVolume(value);
    // if(type === "filter")
    // if(type === "modulation")
  };
  knob.addListener(listener);
  var node = knob.node();
  parentNode.appendChild(node);
}

createKnob(volumeKnob, 5, 0, 10, "volume");
createKnob(modulationKnob, 100, 10, 1000, "modulation");
createKnob(filterKnob, 200, 50, 1000, "filter");
function createDrumElements(name, url) {
  axios
    .post(serverUrl + "/api/soundbank/create", { name, url })
    .then(serverRes => {
      console.log(serverRes.data);
    })
    .catch(err => console.log(err));
}

// createDrumElements(
//   'KICK',
//   'https://ia801507.us.archive.org/18/items/909KICK/909_KICK.wav'
// );
// createDrumElements(
//   'SNARE',
//   'https://ia601408.us.archive.org/34/items/909Snare/909_snare.wav'
// );
// createDrumElements(
//   'HI-HAT',
//   'https://ia601400.us.archive.org/4/items/909HighHat/909_HighHat.wav'
// );
// createDrumElements(
//   'Clap',
//   'https://ia801501.us.archive.org/31/items/909Clap/909_clap.wav'
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
      const snareUrl = servRes.data[1].url;
      const snare = new Drums(snareNode, snareUrl, "snare", audioCtx);
      snare.startSequence(120);
    } catch (e) {
      console.log(e);
    }
  })
  .catch(err => console.log(err));
