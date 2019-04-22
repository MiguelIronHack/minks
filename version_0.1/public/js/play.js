const synthPads = document.querySelectorAll('.synth-pad');

const c$1 = document.getElementById('synth-b').classList;
const d1 = document.getElementById('synth-c').classList;
const d$1 = document.getElementById('synth-d').classList;
const e1 = document.getElementById('synth-e').classList;
const f1 = document.getElementById('synth-f').classList;
const f$1 = document.getElementById('synth-g').classList;
const g1 = document.getElementById('synth-h').classList;
const g$1 = document.getElementById('synth-i').classList;
const a1 = document.getElementById('synth-j').classList;
const a$1 = document.getElementById('synth-k').classList;
const b1 = document.getElementById('synth-l').classList;
const c2 = document.getElementById('synth-m').classList;
const c$2 = document.getElementById('synth-n').classList;
const d = document.getElementById('synth-o').classList;
const d$ = document.getElementById('synth-p').classList;
const c1 = document.getElementById('synth-a').classList;

synthPads.forEach(pad => {
  pad.onclick = setupSounds;
});

function setupSounds(e) {
  e.preventDefault();
  this.onclick = console.log(this);
}
// we tyu
// asdfghjk
document.addEventListener('keydown', e => {
  console.log(e.key);
  console.log(c1);
  if (e.key == 'a') {
    c1.add('active');
  }
});
document.addEventListener('keyup', e => {
  console.log(e.key);
  console.log(c1);
  if (e.key == 'a') {
    c1.remove('active');
  }
});
