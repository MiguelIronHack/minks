import { MIDIController } from "./MIDI_controller.js";
import { KeyBoard } from "./user_keyboard.js";

const audioCtx = new AudioContext();
const synthNode = document.getElementById("synth-parent");
const midiController = new MIDIController(audioCtx);
const keyBoard = new KeyBoard(audioCtx);
const url = "http://localhost:3434";

keyBoard.setKeyListeners(window);
keyBoard.setMouseListener(synthNode.children);

midiController
  .init(window.navigator)
  .then(
    midiController.onMIDISuccess.bind(midiController),
    midiController.onMIDIFailure.bind(midiController)
  );

function getDrumSound() {
  return axios.get(url + "/api/soundbank/drumkit");
}

getDrumSound()
  .then(servRes => {
    let audio = new Audio(servRes.data[1].url);
    audio.play();
  })
  .catch(err => console.log(err));

// console.log(440 * Math.pow(2, (27 - 33) / 12));

// const oscArr = [];
// const keyState = new Object();
// for (let i = 0; i < 200; i++) {
//   oscArr[i] = new Oscillator("triangle", audioCtx);
// }

// const currentOscillator = new Oscillator("sawtooth", audioCtx);
// currentOscillator.start(440 * Math.pow(2, ([data[1]] - 33) / 12));
// console.log("MIDI data", data);
// console.log(type);

/****************************************************
                A minor chord progression ?
 *****************************************************/

// const filterEle = getById("filter");
// const buttons = document.getElementsByClassName("music");
// const disortEle = getById("disortion");
// const gainEle = getById("gain");
// let gain = gainEle.value;
// let filter = filterEle.value;
// let disort = disortEle.value;

//Display knobs in html
// createKnob(getById("filter-knob"), 300, 100, 20000);
// createKnob(getById("distortion-knob"), 300, 100, 20000);
// createKnob(getById("gain-knob"), 0.2, 0.1, 1);

// //Chord Set Up
// function createOscillators(type, audioCtx, array) {
//   for (let i = 0; i < 3; i++) {
//     array[i] = new Oscillator(type, audioCtx);
//   }
// }
// function startOscillators(array, noteIndex) {
//   for (let i = 0; i < 3; i++) {
//     array[i].start(chords[noteIndex][i], audioCtx);
//     array[i].setLowPass(300);
//     array[i].setGain(0.3);
//   }
// }
// function stopOscillator(array) {
//   for (let i = 0; i < 3; i++) {
//     array[i].stop();
//   }
// }
// const oscillatorsArray = [];
// createOscillators("sawtooth", audioCtx, oscillatorsArray);

// for (let index = 0; index < buttons.length; index++) {
//   buttons[index].onmousedown = e => {
//     createOscillators("sawtooth", audioCtx, oscillatorsArray);
//     startOscillators(oscillatorsArray, index);
//     buttons[index].onmouseup = e => {
//       /*  Kill me pls   */
//       stopOscillator(oscillatorsArray);
//       createOscillators("sawtooth", audioCtx, oscillatorsArray);
//     };
//   };
// }

// const analyser = audioCtx.createAnalyser();
// analyser.fftSize = 2048;
// var bufferLength = analyser.frequencyBinCount;
// var dataArray = new Uint8Array(bufferLength);
// analyser.getByteTimeDomainData(dataArray);
// setInterval(() => {
//   analyser.getByteTimeDomainData(dataArray);
//   const newArr = dataArray.reduce((a, b) => a + b);
//   console.log(newArr / 1000);
// }, 1000);

// function getById(id) {
//   return document.getElementById(id);
// }

// Creating control knobs
// function createKnob(parentNode, value, min, max) {
//   let knob = pureknob.createKnob(100, 100);
//   knob.setProperty("angleStart", -0.75 * Math.PI);
//   knob.setProperty("angleEnd", 0.75 * Math.PI);
//   knob.setProperty("colorFG", "#88ff88");
//   knob.setProperty("trackWidth", 0.4);
//   knob.setProperty("valMin", 0);
//   knob.setProperty("valMax", 100);
//   knob.setValue(50);
//   var node = knob.node();
//   parentNode.appendChild(node);
// }
