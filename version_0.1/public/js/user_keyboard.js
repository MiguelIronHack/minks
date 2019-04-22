import { Oscillator } from "./oscillator.js";

export class KeyBoard {
  constructor() {
    this.azerty = true;
    this.qwerty = false;
  }

  setKeyBoardLayout(language) {
    if (language === "english") {
      this.azerty = false;
      this.qwerty = true;
    }
  }

  setListeners(context) {
    console.log(context);
    // context.onkeydown = evt => {
    //   console.log("pressed", evt);
    // };
  }
}
