import { Oscillator } from "./oscillator.js";

export class KeyBoard {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.gainNode = this.audioContext.createGain();
    this.oscArr = this.setOscillators(this.audioContext);
  }

  setOscillators(audioContext) {
    this.gainNode.connect(audioContext.destination);
    const oscArr = [];
    for (let i = 0; i < 16; i++) {
      oscArr[i] = new Oscillator("sine", audioContext, this.gainNode);
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
          "sine",
          this.audioContext,
          this.gainNode
        );
      };
    }
  }

  setKeyListeners(context) {
    const C = 130.81,
      Cs = 138.59,
      D = 146.83,
      Ds = 155.56,
      E = 164.81,
      F = 174.61,
      Fs = 184.99,
      G = 195.99,
      Gs = 207.65,
      A = 220,
      As = 233.08,
      B = 246.94,
      C3 = 261.62,
      Cs3 = 277.18,
      D3 = 293.66,
      Ds3 = 311.12;
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

    // context.onkeyup = evt => {
    //   const { oscArr, gainNode, audioContext } = this;
    //   if (evt.code === "KeyA") {
    //     oscArr[0].stop();
    //   }
    //   if (evt.code === "KeyW") {
    //     oscArr[1].stop();
    //     oscArr[1] = new Oscillator("sine", audioContext, gainNode);
    //   }
    //   if (evt.code === "KeyS") {
    //     oscArr[2].stop();
    //     oscArr[2] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyE") {
    //     oscArr[3].stop();
    //     oscArr[3] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyD") {
    //     oscArr[4].stop();
    //     oscArr[4] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyF") {
    //     oscArr[5].stop();
    //     oscArr[5] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyT") {
    //     oscArr[6].stop();
    //     oscArr[6] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyG") {
    //     oscArr[7].stop();
    //     oscArr[7] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyY") {
    //     oscArr[8].stop();
    //     oscArr[8] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyH") {
    //     oscArr[9].stop();
    //     oscArr[9] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyU") {
    //     oscArr[10].stop();
    //     oscArr[10] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyJ") {
    //     oscArr[11].stop();
    //     oscArr[11] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyK") {
    //     oscArr[12].stop();
    //     oscArr[12] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyO") {
    //     oscArr[13].stop();
    //     oscArr[13] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyL") {
    //     oscArr[14].stop();
    //     oscArr[14] = new Oscillator("sine", audioContext);
    //   }
    //   if (evt.code === "KeyP") {
    //     oscArr[15].stop();
    //     oscArr[15] = new Oscillator("sine", audioContext);
    //   }
    // };
    context.onkeydown = evt => {
      const { oscArr, gainNode, audioContext } = this;
      if (evt.code === "KeyA" && !oscArr[0].isStarted) {
        oscArr[0].isStarted = true;
        var loop = new Tone.Loop(function(time) {
          synth.triggerAttackRelease("C2", "4n", time);
        }, "4n");
        loop.start("1m").stop("4m");
        Tone.Transport.start();
        //create a synth and connect it to the master output (your speakers)
        //play a middle 'C' for the duration of an 8th note
        // synth.triggerAttackRelease("C4");
      }

      if (evt.code === "KeyW" && !oscArr[1].isStarted) {
        osc.play(note);
        // oscArr[1].isStarted = true;
        // oscArr[1].start(notesFromC2[1], gainNode);
      }
      if (evt.code === "KeyS" && !oscArr[2].isStarted) {
        oscArr[2].start(notesFromC2[2], gainNode);
      }
      if (evt.code === "KeyE" && !oscArr[3].isStarted) {
        oscArr[3].start(notesFromC2[3], gainNode);
      }
      if (evt.code === "KeyD" && !oscArr[4].isStarted) {
        oscArr[4].start(notesFromC2[4], gainNode);
      }
      if (evt.code === "KeyF" && !oscArr[5].isStarted) {
        oscArr[5].start(notesFromC2[5], gainNode);
      }
      if (evt.code === "KeyT" && !oscArr[6].isStarted) {
        oscArr[6].start(notesFromC2[6], gainNode);
      }
      if (evt.code === "KeyG" && !oscArr[7].isStarted) {
        oscArr[7].start(notesFromC2[7], gainNode);
      }
      if (evt.code === "KeyY" && !oscArr[8].isStarted) {
        oscArr[8].start(notesFromC2[8], gainNode);
      }
      if (evt.code === "KeyH" && !oscArr[9].isStarted) {
        oscArr[9].start(notesFromC2[9], gainNode);
      }
      if (evt.code === "KeyU" && !oscArr[10].isStarted) {
        oscArr[10].start(notesFromC2[10], gainNode);
      }
      if (evt.code === "KeyJ" && !oscArr[11].isStarted) {
        oscArr[11].start(notesFromC2[11], gainNode);
      }
      if (evt.code === "KeyK" && !oscArr[12].isStarted) {
        oscArr[12].start(notesFromC2[12], gainNode);
      }
      if (evt.code === "KeyO" && !oscArr[13].isStarted) {
        oscArr[13].start(notesFromC2[13], gainNode);
      }
      if (evt.code === "KeyL" && !oscArr[14].isStarted) {
        oscArr[14].start(notesFromC2[14], gainNode);
      }
      if (evt.code === "KeyP" && !oscArr[15].isStarted) {
        oscArr[15].start(notesFromC2[15], gainNode);
      }
    };
  }
}
