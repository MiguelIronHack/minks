import { Oscillator } from './oscillator.js';

export class KeyBoard {
  constructor(audioContext, gain) {
    this.azerty = false;
    this.qwerty = true;
    this.audioContext = audioContext;
    this.gainNode = this.audioContext.createGain();
    this.oscArr = this.setOscillators(this.audioContext);
  }

  setOscillators(audioContext) {
    this.gainNode.connect(audioContext.destination);
    const oscArr = [];
    for (let i = 0; i < 16; i++) {
      oscArr[i] = new Oscillator('sine', audioContext);
    }
    return oscArr;
  }
  setMouseListener(domElements) {
    const C = 130.813,
      Cs = 138.591,
      D = 146.832,
      Ds = 155.563,
      E = 164.814,
      F = 174.614,
      Fs = 184.997,
      G = 195.998,
      Gs = 207.652,
      A = 220,
      As = 233.082,
      B = 246.942,
      C3 = 261.626,
      Cs3 = 277.183,
      D3 = 293.665,
      Ds3 = 311.127;

    const notesFromC2 = [
      C,
      Cs,
      D,
      Ds,
      E,
      F,
      Fs,
      G,
      Gs,
      A,
      As,
      B,
      C3,
      Cs3,
      D3,
      Ds3
    ];
    let mappedArr = [];
    for (let i = 12, count = 1; i >= 0; count++) {
      if (count < 5) {
        mappedArr.push(notesFromC2[i + count - 1]);
      } else {
        i -= 4;
        count = 0;
      }
    }

    const arr = Array.from(domElements);
    for (let ele of arr) {
      ele.onmousedown = evt => {
        this.oscArr[arr.indexOf(ele)].start(
          mappedArr[arr.indexOf(ele)],
          this.gainNode
        );
      };
      ele.onmouseup = evt => {
        this.oscArr[arr.indexOf(ele)].stop();
        this.oscArr[arr.indexOf(ele)] = new Oscillator(
          'sine',
          this.audioContext
        );
      };
    }
  }
  setKeyListeners(context) {
    const C = 130.813,
      Cs = 138.591,
      D = 146.832,
      Ds = 155.563,
      E = 164.814,
      F = 174.614,
      Fs = 184.997,
      G = 195.998,
      Gs = 207.652,
      A = 220,
      As = 233.082,
      B = 246.942,
      C3 = 261.626,
      Cs3 = 277.183,
      D3 = 293.665,
      Ds3 = 311.127;
    const notesFromC2 = [
      C,
      Cs,
      D,
      Ds,
      E,
      F,
      Fs,
      G,
      Gs,
      A,
      As,
      B,
      C3,
      Cs3,
      D3,
      Ds3
    ];

    context.onkeyup = evt => {
      if (evt.code === 'KeyA') {
        this.oscArr[0].stop();
        this.oscArr[0] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyW') {
        this.oscArr[1].stop();
        this.oscArr[1] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyS') {
        this.oscArr[2].stop();
        this.oscArr[2] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyE') {
        this.oscArr[3].stop();
        this.oscArr[3] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyD') {
        this.oscArr[4].stop();
        this.oscArr[4] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyF') {
        this.oscArr[5].stop();
        this.oscArr[5] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyT') {
        this.oscArr[6].stop();
        this.oscArr[6] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyG') {
        this.oscArr[7].stop();
        this.oscArr[7] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyY') {
        this.oscArr[8].stop();
        this.oscArr[8] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyH') {
        this.oscArr[9].stop();
        this.oscArr[9] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyU') {
        this.oscArr[10].stop();
        this.oscArr[10] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyJ') {
        this.oscArr[11].stop();
        this.oscArr[11] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyK') {
        this.oscArr[12].stop();
        this.oscArr[12] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyO') {
        this.oscArr[13].stop();
        this.oscArr[13] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyL') {
        this.oscArr[14].stop();
        this.oscArr[14] = new Oscillator('triangle', this.audioContext);
      }
      if (evt.code === 'KeyP') {
        this.oscArr[15].stop();
        this.oscArr[15] = new Oscillator('triangle', this.audioContext);
      }
    };
    context.onkeydown = evt => {
      if (evt.code === 'KeyA' && !this.oscArr[0].isStarted) {
        this.oscArr[0].start(notesFromC2[0], this.gainNode);
      }
      if (evt.code === 'KeyW' && !this.oscArr[1].isStarted) {
        this.oscArr[1].start(notesFromC2[1], this.gainNode);
      }
      if (evt.code === 'KeyS' && !this.oscArr[2].isStarted) {
        this.oscArr[2].start(notesFromC2[2], this.gainNode);
      }
      if (evt.code === 'KeyE' && !this.oscArr[3].isStarted) {
        this.oscArr[3].start(notesFromC2[3], this.gainNode);
      }
      if (evt.code === 'KeyD' && !this.oscArr[4].isStarted) {
        this.oscArr[4].start(notesFromC2[4], this.gainNode);
      }
      if (evt.code === 'KeyF' && !this.oscArr[5].isStarted) {
        this.oscArr[5].start(notesFromC2[5], this.gainNode);
      }
      if (evt.code === 'KeyT' && !this.oscArr[6].isStarted) {
        this.oscArr[6].start(notesFromC2[6], this.gainNode);
      }
      if (evt.code === 'KeyG' && !this.oscArr[7].isStarted) {
        this.oscArr[7].start(notesFromC2[7], this.gainNode);
      }
      if (evt.code === 'KeyY' && !this.oscArr[8].isStarted) {
        this.oscArr[8].start(notesFromC2[8], this.gainNode);
      }
      if (evt.code === 'KeyH' && !this.oscArr[9].isStarted) {
        this.oscArr[9].start(notesFromC2[9], this.gainNode);
      }
      if (evt.code === 'KeyU' && !this.oscArr[10].isStarted) {
        this.oscArr[10].start(notesFromC2[10], this.gainNode);
      }
      if (evt.code === 'KeyJ' && !this.oscArr[11].isStarted) {
        this.oscArr[11].start(notesFromC2[11], this.gainNode);
      }
      if (evt.code === 'KeyK' && !this.oscArr[12].isStarted) {
        this.oscArr[12].start(notesFromC2[12], this.gainNode);
      }
      if (evt.code === 'KeyO' && !this.oscArr[13].isStarted) {
        this.oscArr[13].start(notesFromC2[13], this.gainNode);
      }
      if (evt.code === 'KeyL' && !this.oscArr[14].isStarted) {
        this.oscArr[14].start(notesFromC2[14], this.gainNode);
      }
      if (evt.code === 'KeyP' && !this.oscArr[15].isStarted) {
        this.oscArr[15].start(notesFromC2[15], this.gainNode);
      }
    };
  }
}
