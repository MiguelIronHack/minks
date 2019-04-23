export class Oscillator {
  constructor() {
    // this.audioCtx = audioCtx;
    // this.gainNode = gain;
    // this.osc = this.audioCtx.createOscillator();
    // this.biquadFilter = audioCtx.createBiquadFilter();
    // this.osc.type = type;
    this.isStarted = false;
  }

  play(note) {
    this.synth.triggerAttackRelease(note, "4n");
  }

  start(freq) {
    this.osc.connect(this.gainNode);
    // this.biquadFilter.connect(this.gainNode);
    // this.gainNode.connect(this.audioCtx.destination);
    this.isStarted = true;
    this.osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    this.osc.start();
  }
  stop() {
    this.osc.stop();
    this.isStarted = false;
  }
  // setGain(val) {
  //   this.gainNode.gain.setValueAtTime(val, this.audioCtx.currentTime);
  // }
  // setLowPass(val) {
  //   this.biquadFilter.type = "lowpass";
  //   this.biquadFilter.frequency.setValueAtTime(val, this.audioCtx.currentTime);
  // }
}
