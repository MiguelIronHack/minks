import { Oscillator } from './oscillator.js';

export class MIDIController {
  constructor(audioCtx) {
    this.data = null;
    this.midis = 1;
    this.audioCtx = audioCtx;
    this.filter = 0;
    this.reverb = 0;
    this.gain = this.audioCtx.createGain();
    this.keyState = new Object();
    this.oscArr = [];
  }

  init(context) {
    this.gain.connect(this.audioCtx.destination);
    if (context.requestMIDIAccess) {
      for (let i = 0; i < 100; i++) {
        this.oscArr[i] = new Oscillator('sawtooth', this.audioCtx);
      }
      return context.requestMIDIAccess({
        sysex: false
      });
    } else {
      alert('No MIDI support in your browser.');
    }
  }

  onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    this.midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
    let inputs = this.midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (
      let input = inputs.next();
      input && !input.done;
      input = inputs.next()
    ) {
      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
    }
  }

  onMIDIFailure(error) {
    console.log(
      `No access to MIDI devices or Browser doesnt support midi: ${error}`
    );
  }

  onMIDIMessage(message) {
    console.log(this.oscArr);
    this.data = message.data; //  [Command, note, velocity]
    let velocity = this.data[2];
    let note = this.data[1];
    console.log(this.keyState);
    if (velocity > 1) this.keyState[note] = true; // NOTE ON
    if (!velocity) this.keyState[note] = false; //NOTE OFF

    if (this.keyState[note] && !this.oscArr[note].isStarted) {
      this.oscArr[note] = new Oscillator('sine', this.audioCtx);
      this.oscArr[note].start(this.noteToFrequence(note), this.gain);
    }
    if (!this.keyState[note] && this.oscArr[note].isStarted) {
      this.oscArr[note].stop();
      this.oscArr[note] = new Oscillator('sine', this.audioCtx);
    }
  }

  noteToFrequence(note) {
    return 440 * Math.pow(2, (note - 33) / 12);
  }

  setGain(value) {}
  setFilter(value) {}
  setReverb(value) {}
}
