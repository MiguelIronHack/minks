export class MIDIController {
  constructor() {
    this.data = null;
    this.midi = null;
    this.keyState = new Object();
    this.synthArray = [];
  }

  init(context) {
    if (context.requestMIDIAccess) {
      for (let i = 0; i < 100; i++) {
        let synth = new Tone.Synth({
          oscillator: {
            type: this.synthType,
            modulationType: this.modulationType,
            modulationIndex: 3,
            harmonicity: 3.4
          },
          envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.1,
            release: 4
          }
        }).toMaster();
        synth.volume.value = -5;
        this.synthArray.push(synth);
      }
      return context.requestMIDIAccess({
        sysex: false
      });
    } else {
      alert("No MIDI support in your browser.");
    }
  }

  onMIDISuccess(midiAccess) {
    console.log(`Midi Success: ${midiAccess}`);
    this.midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
    let inputs = this.midi.inputs.values();

    for (let input of inputs) {
      input.onmidimessage = this.onMIDIMessage.bind(this);
    }
  }

  onMIDIFailure(error) {
    console.log(
      `No access to MIDI devices or Browser doesnt support midi: ${error}`
    );
  }

  onMIDIMessage(message) {
    this.data = message.data; //  [Command, note, velocity]
    let velocity = this.data[2];
    let note = this.data[1];
    if (velocity > 1) this.keyState[note] = true; // NOTE ON
    if (!velocity) this.keyState[note] = false; //NOTE OFF

    if (this.keyState[note]) {
      this.synthArray[note].triggerAttack(this.noteToFrequence(note));
    }
    if (!this.keyState[note]) {
      this.synthArray[note].triggerRelease();
    }
  }
  noteToFrequence(note) {
    return 440 * Math.pow(2, (note - 33) / 12);
  }
  setGain(value) {}
  setFilter(value) {}
  setReverb(value) {}
  setType(value) {}
}
