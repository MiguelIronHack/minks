/* Synth */
const synthPads = document.querySelectorAll(".synth-pad");

const c0 = document.getElementById("synth-a").classList;
const c$0 = document.getElementById("synth-b").classList;
const d0 = document.getElementById("synth-c").classList;
const d$0 = document.getElementById("synth-d").classList;
const g$1 = document.getElementById("synth-e").classList;
const a1 = document.getElementById("synth-f").classList;
const a$1 = document.getElementById("synth-g").classList;
const b1 = document.getElementById("synth-h").classList;
const e1 = document.getElementById("synth-i").classList;
const f1 = document.getElementById("synth-j").classList;
const f$1 = document.getElementById("synth-k").classList;
const g1 = document.getElementById("synth-l").classList;
const c1 = document.getElementById("synth-m").classList;
const c$1 = document.getElementById("synth-n").classList;
const d1 = document.getElementById("synth-o").classList;
const d$1 = document.getElementById("synth-p").classList;
const volumeKnob = document.getElementById("volume-knob");
const modulationKnob = document.getElementById("modulation-knob");
const filterKnob = document.getElementById("filter-knob");

function createKnob(parentNode, value, min, max) {
  let knob = pureknob.createKnob(100, 100);
  knob.setProperty("angleStart", -0.75 * Math.PI);
  knob.setProperty("angleEnd", 0.75 * Math.PI);
  knob.setProperty("colorFG", "#88ff88");
  knob.setProperty("trackWidth", 0.4);
  knob.setProperty("valMin", 0);
  knob.setProperty("valMax", 100);
  knob.setValue(10);
  var node = knob.node();
  parentNode.appendChild(node);
}
let gain = createKnob(volumeKnob, 0.5, 0.1, 1);
createKnob(modulationKnob, 100, 10, 1000);
createKnob(filterKnob, 200, 50, 1000);
console.log(gain);
synthPads.forEach(pad => {
  pad.addEventListener("mousedown", () => {
    pad.classList.add("active");
  });
  pad.addEventListener("mouseup", () => {
    pad.classList.remove("active");
  });
});

document.addEventListener("keydown", e => {
  if (e.code == "KeyA") {
    c1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyA") {
    c1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyW") {
    c$1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyW") {
    c$1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyS") {
    d1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyS") {
    d1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyE") {
    d$1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyE") {
    d$1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyD") {
    e1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyD") {
    e1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyF") {
    f1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyF") {
    f1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyT") {
    f$1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyT") {
    f$1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyG") {
    g1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyG") {
    g1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyY") {
    g$1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyY") {
    g$1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyH") {
    a1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyH") {
    a1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyU") {
    a$1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyU") {
    a$1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyJ") {
    b1.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyJ") {
    b1.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyK") {
    c0.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyK") {
    c0.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyO") {
    c$0.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyO") {
    c$0.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyL") {
    d0.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyL") {
    d0.remove("active");
  }
});
document.addEventListener("keydown", e => {
  if (e.code == "KeyP") {
    d$0.add("active");
  }
});
document.addEventListener("keyup", e => {
  if (e.code == "KeyP") {
    d$0.remove("active");
  }
});

/* */
const drumPad = document.querySelectorAll(".drum-pad-row-container div");

drumPad.forEach(e => {
  e.addEventListener("click", () => {
    e.classList.toggle("active");
  });
});
