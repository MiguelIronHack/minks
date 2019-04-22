const menuButton = document.getElementById('menuButton');
menuButton.addEventListener('click', e => {
  menuButton.classList.toggle('is-active');
  e.preventDefault();
});
