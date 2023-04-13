const burgerMenuIcon = document.querySelector('.burger-menu-icon');
const burgerMenuList = document.querySelector('.burger-menu-list');

burgerMenuIcon.addEventListener('click', function() {
  burgerMenuList.classList.toggle('show-menu');
});

