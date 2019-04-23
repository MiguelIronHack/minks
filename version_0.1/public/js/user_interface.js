export class KeyBoard {
  constructor(notes) {
    this.noteScale = notes;
    this.synthType = "sawtooth";

    this.synthArray = this.createSynths();
    this.keyState = new Object();
  }

  setMouseListener(domElements) {
    let mappedArr = [];
    for (let i = 12, count = 1; i >= 0; count++) {
      if (count < 5) {
        mappedArr.push(this.noteScale[i + count - 1]);
      } else {
        i -= 4;
        count = 0;
      }
    }
    const arr = Array.from(domElements);
    for (let ele of arr) {
      ele.onmousedown = evt => {
        let note = mappedArr[arr.indexOf(ele)];
        this.synthArray[arr.indexOf(ele)].triggerAttack(note);
      };
      ele.onmouseup = evt => {
        this.synthArray[arr.indexOf(ele)].triggerRelease();
      };
    }
  }

  createSynths() {
    const synthArray = [];
    for (let i = 0; i < 16; i++) {
      let synth = new Tone.Synth({
        oscillator: {
          type: this.synthType,
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
      synth.volume.value = 0;
      synthArray.push(synth);
    }
    return synthArray;
  }

  setKeyListeners(context) {
    const { keyState } = this;
    context.onkeydown = evt => {
      if (evt.code === "KeyA" && !keyState[evt.code]) this.play(0, evt.code);
      if (evt.code === "KeyW" && !keyState[evt.code]) this.play(1, evt.code);
      if (evt.code === "KeyS" && !keyState[evt.code]) this.play(2, evt.code);
      if (evt.code === "KeyE" && !keyState[evt.code]) this.play(3, evt.code);
      if (evt.code === "KeyD" && !keyState[evt.code]) this.play(4, evt.code);
      if (evt.code === "KeyF" && !keyState[evt.code]) this.play(5, evt.code);
      if (evt.code === "KeyT" && !keyState[evt.code]) this.play(6, evt.code);
      if (evt.code === "KeyG" && !keyState[evt.code]) this.play(7, evt.code);
      if (evt.code === "KeyY" && !keyState[evt.code]) this.play(8, evt.code);
      if (evt.code === "KeyH" && !keyState[evt.code]) this.play(9, evt.code);
      if (evt.code === "KeyU" && !keyState[evt.code]) this.play(10, evt.code);
      if (evt.code === "KeyJ" && !keyState[evt.code]) this.play(11, evt.code);
      if (evt.code === "KeyK" && !keyState[evt.code]) this.play(12, evt.code);
      if (evt.code === "KeyO" && !keyState[evt.code]) this.play(13, evt.code);
      if (evt.code === "KeyL" && !keyState[evt.code]) this.play(14, evt.code);
      if (evt.code === "KeyP" && !keyState[evt.code]) this.play(15, evt.code);
    };
    context.onkeyup = evt => {
      if (evt.code === "KeyA") this.stop(0, evt.code);
      if (evt.code === "KeyW") this.stop(1, evt.code);
      if (evt.code === "KeyS") this.stop(2, evt.code);
      if (evt.code === "KeyE") this.stop(3, evt.code);
      if (evt.code === "KeyD") this.stop(4, evt.code);
      if (evt.code === "KeyF") this.stop(5, evt.code);
      if (evt.code === "KeyT") this.stop(6, evt.code);
      if (evt.code === "KeyG") this.stop(7, evt.code);
      if (evt.code === "KeyY") this.stop(8, evt.code);
      if (evt.code === "KeyH") this.stop(9, evt.code);
      if (evt.code === "KeyU") this.stop(10, evt.code);
      if (evt.code === "KeyJ") this.stop(11, evt.code);
      if (evt.code === "KeyK") this.stop(12, evt.code);
      if (evt.code === "KeyO") this.stop(13, evt.code);
      if (evt.code === "KeyL") this.stop(14, evt.code);
      if (evt.code === "KeyP") this.stop(15, evt.code);
    };
  }

  play(index, keyCode) {
    this.keyState[keyCode] = true;
    this.synthArray[index].triggerAttack(this.noteScale[index]);
  }

  stop(index, keyCode) {
    this.keyState[keyCode] = false;
    this.synthArray[index].triggerRelease();
  }

  setVolume(val) {
    for (let synth of this.synthArray) synth.volume.value = val;
  }
  setType(type) {
    for (let synth of this.synthArray) synth.oscillator.type = type;
  }
  setModulationType(type) {
    for (let synth of this.synthArray) synth.modulationType = type;
  }
}
