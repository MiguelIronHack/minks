const synthPads = document.querySelectorAll('.synth-pad');

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
  const c1 = (document.getElementById('synth-a').style.background =
    'lighten($color: $click, $amount: 10)');
  const c$1 = document.getElementById('synth-b').style;
  const d1 = document.getElementById('synth-c').style;
  const d$1 = document.getElementById('synth-d').style;
  const e1 = document.getElementById('synth-e').style;
  const f1 = document.getElementById('synth-f').style;
  const f$1 = document.getElementById('synth-g').style;
  const g1 = document.getElementById('synth-h').style;
  const g$1 = document.getElementById('synth-i').style;
  const a1 = document.getElementById('synth-j').style;
  const a$1 = document.getElementById('synth-k').style;
  const b1 = document.getElementById('synth-l').style;
  const c2 = document.getElementById('synth-m').style;
  const c$2 = document.getElementById('synth-n').style;
  const d = document.getElementById('synth-o').style;
  const d$ = document.getElementById('synth-p').style;
  console.log(e.key);
  console.log(c1);
  if (e.key == 'a') {
    c1;
  }
});
a;
