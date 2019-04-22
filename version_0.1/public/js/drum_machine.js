export class Drums {
  constructor(DOMItems, url, name, context) {
    this.DOMItems = DOMItems;
    this.url = url;
    this.name = name || "drum Element";
    this.context = context;
    this.reverb = null;
    this.filter = null;
  }

  playSound() {}
}
