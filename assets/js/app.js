const app = {
  iconeBurgerMenu: null,

  init: function () {
    app.addEventListenerToAction();
    app.usersSelector();
  },


  addEventListenerToAction: function () {
    //event for the click on the burger menu
    app.iconeBurgerMenu = document.querySelector('.navbar-mobile i');
    app.iconeBurgerMenu.addEventListener('click', app.handleBurgerMenu);

    //event for the click on the FAQ
    const questions = document.querySelectorAll('.question');
    questions.forEach((question) => {
      question.addEventListener('click', app.handlerFaq);
    });
    //event on click to open the right modale
    const openModals = document.querySelectorAll('.open-modal');// all the button wich have the class open-modal

    openModals.forEach((button) => {
      button.addEventListener('click', modal.openModal);
    });
    //event on click to close modals
    const closeModals = document.querySelectorAll('.btn-close');
    closeModals.forEach((closeButton) => {
      closeButton.addEventListener('click', modal.closeModal)
    });

  },


  /**
   * handler to open and hide the modal of burger menu
   */
  handleBurgerMenu: () => {
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

  /**
   * handler to open FAQ accordeon
   */

  handlerFaq: (event) => {
    const question = event.target.closest('.question');//search the most near element of  .question
    if (question) {
      const next = question.nextElementSibling;
      const icone = question.lastElementChild;
      next.classList.toggle('visible');
      icone.classList.toggle('rotate');
    }
  },

  usersSelector: () => {
    const parentLogin = document.querySelector('.parent-login');
    const nannyLogin = document.querySelector('.nanny-login');
    const parentRegister = document.querySelector('.parent-register');
    const nannyRegister = document.querySelector('.nanny-register');

    parentRegister.addEventListener('click', modal.selectParentRegister);
    nannyRegister.addEventListener('click', modal.selectNannyRegister);
    parentLogin.addEventListener('click', modal.selectParentLogin);
    nannyLogin.addEventListener('click', modal.selectNannyLogin);

    modal.formLogin.addEventListener('submit', modal.submitFormLogin);
    modal.formSignUp.addEventListener('submit', modal.submitFormRegister);

  },

  handlerFlashMessage: function () {
    const flashSuccess = document.querySelector('.success-modal');
    const flashError = document.querySelector('.error-modal');
    const messageSuccess = document.querySelector('.success-message');
    const messageError = document.querySelector('.error-message');
    if (messageSuccess.textContent) {
      flashSuccess.classList.add('active');
      setTimeout(() => {
        flashSuccess.classList.remove('active');
        messageSuccess.textContent = '';
      }, 5000);
    }

    if (messageError.textContent) {
      flashError.classList.add('active');
      setTimeout(() => {
        flashError.classList.remove('active');
        messageError.textContent = '';
      }, 5000);
    }

    const btnClose = document.querySelectorAll('.btn-close-message');
    btnClose.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.parentNode.classList.remove('active');
        btn.parentNode.querySelector('p').textContent = '';
      });
    });
  },


}




document.addEventListener('DOMContentLoaded', app.init);


