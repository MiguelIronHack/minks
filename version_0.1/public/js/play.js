const synthPads = document.querySelectorAll('.synth-pad');

const c0 = document.getElementById('synth-a').classList;
const c$0 = document.getElementById('synth-b').classList;
const d0 = document.getElementById('synth-c').classList;
const d$0 = document.getElementById('synth-d').classList;
const e1 = document.getElementById('synth-e').classList;
const f1 = document.getElementById('synth-f').classList;
const f$1 = document.getElementById('synth-g').classList;
const g1 = document.getElementById('synth-h').classList;
const g$1 = document.getElementById('synth-i').classList;
const a1 = document.getElementById('synth-j').classList;
const a$1 = document.getElementById('synth-k').classList;
const b1 = document.getElementById('synth-l').classList;
const c1 = document.getElementById('synth-m').classList;
const c$1 = document.getElementById('synth-n').classList;
const d1 = document.getElementById('synth-o').classList;
const d$1 = document.getElementById('synth-p').classList;

synthPads.forEach(pad => {
  pad.addEventListener('mousedown', () => {
    pad.classList.add('active');
  });
  pad.addEventListener('mouseup', () => {
    pad.classList.remove('active');
  });
});

document.addEventListener('keydown', e => {
  if (e.code == 'KeyA') {
    c0.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyA') {
    c0.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyW') {
    c$0.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyW') {
    c$0.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyS') {
    d0.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyS') {
    d0.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyE') {
    d$0.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyE') {
    d$0.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyD') {
    e1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyD') {
    e1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyF') {
    f1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyF') {
    f1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyT') {
    f$1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyT') {
    f$1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyG') {
    g1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyG') {
    g1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyY') {
    g$1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyY') {
    g$1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyH') {
    a1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyH') {
    a1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyU') {
    a$1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyU') {
    a$1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyJ') {
    b1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyJ') {
    b1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyK') {
    c1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyK') {
    c1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyO') {
    c$1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyO') {
    c$1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyL') {
    d1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyL') {
    d1.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.code == 'KeyP') {
    d$1.add('active');
  }
});
document.addEventListener('keyup', e => {
  if (e.code == 'KeyP') {
    d$1.remove('active');
  }
});

/* */
const drumPad = document.querySelectorAll('.drum-pad-row-container div');

drumPad.forEach(e => {
  e.addEventListener('click', () => {
    e.classList.toggle('active');
  });
});
