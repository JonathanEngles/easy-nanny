const app = {
    iconeBurgerMenu : null,

    init: function() {
        app.addEventListenerToAction();
    },


    addEventListenerToAction: function () {
        //event for the click on the burger menu
    app.iconeBurgerMenu = document.querySelector('.navbar-mobile i');
    app.iconeBurgerMenu.addEventListener('click', app.handleBurgerMenu);

        
        //event on click to open the right modale
        const openModals = document.querySelectorAll('.open-modal');// all the button wich have the class open-modal

        openModals.forEach((button) => {
            button.addEventListener('click', modal.openModal);
    });
//event on click to close modals
    const closeModals = document.querySelectorAll('.btn-close');
closeModals.forEach((closeButton) => {
  closeButton.addEventListener('click', modal.closeModal)});

  
},

/**
 * handler to open and hide the modal of burger menu
 */
handleBurgerMenu : () => {
    const modal = document.querySelector('.modal-burger-menu');
    modal.classList.toggle('change-modal');
    app.iconeBurgerMenu.classList.toggle('fa-times');

    // Select all buttons with the two-links class
  const buttons = document.querySelectorAll('.two-links');

  // Add event listeners to the buttons
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      modal.classList.remove('change-modal');
      app.iconeBurgerMenu.classList.remove('fa-times');
    });
});
},

}

const modal = {
    /**
     * function to open allmodal thanks to the data-modal
     */
    openModal : function() {
        const modal = document.querySelector('.' + this.dataset.modal);
        modal.classList.add('active');
    },
    /**
     * function to close all modal
     */
    closeModal : (event) => {
        const closeButton = event.target
        const modal =  closeButton.closest('.modal');
        modal.classList.remove('active');
    },
}



document.addEventListener('DOMContentLoaded', app.init);


