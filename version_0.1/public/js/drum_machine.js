export class Drums {
  constructor(DOMItems, url, name, context) {
    this.DOMItems = DOMItems.children;
    this.url = url;
    this.name = name || "drum Element";
    this.context = context;
    this.reverb = null;
    this.filter = null;
  }

  playSound() {
    let audio = new Audio(this.url);
    audio.play();
  }
  startSequence(bpm) {
    let step = 0;
    setInterval(() => {
      if (step > 7) step = 0;
      if (this.DOMItems[step].classList.contains("active")) this.playSound();
      step++;
    }, 60000 / bpm);
  }
}
