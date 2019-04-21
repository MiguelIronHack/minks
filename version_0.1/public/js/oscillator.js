export class Oscillator {
  constructor(type, audioCtx) {
    this.audioCtx = audioCtx;
    // this.gainNode = this.audioCtx.createGain();
    this.osc = this.audioCtx.createOscillator();
    // this.biquadFilter = audioCtx.createBiquadFilter();
    this.osc.type = type;
    this.isStarted = false;
  }
  start(freq, gainNode) {
    this.osc.connect(gainNode);
    // this.biquadFilter.connect(this.gainNode);
    // this.gainNode.connect(this.audioCtx.destination);
    this.isStarted = true;
    this.osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    this.osc.start();
  }
  stop() {
    this.osc.stop();
  }
  // setGain(val) {
  //   this.gainNode.gain.setValueAtTime(val, this.audioCtx.currentTime);
  // }
  // setLowPass(val) {
  //   this.biquadFilter.type = "lowpass";
  //   this.biquadFilter.frequency.setValueAtTime(val, this.audioCtx.currentTime);
  // }
}
