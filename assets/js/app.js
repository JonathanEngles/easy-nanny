const app = {
    iconeBurgerMenu : null,

    init: function() {
        app.addEventListenerToAction();
    },


    addEventListenerToAction: function () {
        //event for the click on the burger menu
    app.iconeBurgerMenu = document.querySelector('.navbar-mobile i');
    app.iconeBurgerMenu.addEventListener('click', app.handleBurgerMenu);

        //event for the click on the FAQ
        const questions = document.querySelectorAll('.question');
        questions.forEach((question) => {
            question.addEventListener('click', app.handlerFaq);
})},

/**
 * funtion to open and hide the modal of burger menu
 */
handleBurgerMenu : () => {
    const modal = document.querySelector('.modal-burger-menu');
    modal.classList.toggle('change-modal');
    icone.classList.toggle('fa-times');
},

//FAQ accordeon
handlerFaq :  (event) => {
    const question = event.target
    const next = question.nextElementSibling;
    const icone = question.lastElementChild;
    next.classList.toggle('visible');
    icone.classList.toggle('rotate');
},


}




document.addEventListener('DOMContentLoaded', app.init);


