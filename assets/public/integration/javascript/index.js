var icones = document.querySelectorAll("p i");
for (var i = 0; i < icones.length; i++) {
  icones[i].addEventListener("click", function() {
    var contenu = this.parentElement.nextElementSibling;
    this.classList.toggle("active");
    contenu.classList.toggle("show");
  });
}
