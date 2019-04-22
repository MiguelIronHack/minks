const menuButton = document.getElementById('menuButton');

const burgerMenuChildren = document.querySelectorAll(
  '.burger-menu > * > *:not(.menu-button)'
);

const list = document.getElementById('menu');
menuButton.addEventListener('click', e => {
  menuButton.classList.toggle('is-active');
  burgerMenuChildren.forEach(e => {
    e.style.display == 'flex'
      ? (e.style.display = 'none')
      : (e.style.display = 'flex');
  });
  e.preventDefault();
});
