document.addEventListener('DOMContentLoaded', function() {
  const burgerMenuIcon = document.querySelector('.burger-menu-icon');
const burgerMenuList = document.querySelector('.burger-menu-list');

burgerMenuIcon.addEventListener('click', function() {
  burgerMenuList.classList.toggle('show-menu');
});

  document.addEventListener('click', function(event) {
    const isClickInside = burgerMenuIcon.contains(event.target) || burgerMenuList.contains(event.target);
    if (!isClickInside) {
      burgerMenuList.classList.remove('show-menu');
    }
  });

  const burgerMenuLinks = burgerMenuList.querySelectorAll('a');
  burgerMenuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      burgerMenuList.classList.remove('show-menu');
    });
  });

});
