const app = {
  iconeBurgerMenu: null,
  formModifyProfile: document.querySelector('.modify-form'),
  modal: document.querySelector('.profile-children-modal'),
  childPictureElement: document.getElementById('child-picture'),
  childNameElement: document.getElementById('child-name'),
  childFirstNameElement: document.getElementById('child-first-name'),
  childBirthdayElement: document.getElementById('child-birthday'),
  childDescriptionElement: document.getElementById('child-description'),
  parentNameElement: document.getElementById('parent-name'),
  parentFirstNameElement: document.getElementById('parent-first-name'),



  init: function () {
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
      closeButton.addEventListener('click', modal.closeModal)
    });

    app.formModifyProfile.addEventListener('submit', app.submitFormModify);


    const children = document.querySelectorAll('.children-profil');
    children.forEach((child) => {
      child.addEventListener('click', () => {
        modal.displayChildInformation(child);
      });
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
  // function to submit the modification of user
  submitFormModify: (event) => {
    event.preventDefault();

    const emailNotEmpty = validation.emailField.value.trim() !== '';
    const passwordNotEmpty = validation.passwordField.value.trim() !== '';

    if (!emailNotEmpty && !passwordNotEmpty) {
      if (!confirm(`êtes vous sur de vouloir modifier votre profil?`)) return;
      event.target.submit();
      return;
    }

    if (emailNotEmpty) {
      const emailValid = validation.emailRegex.test(validation.emailField.value);
      if (!emailValid) {
        validation.emailError.textContent = 'Veuillez saisir une adresse email valide';
        validation.emailError.classList.add('is-invalid');
        return;
      }
    }

    if (passwordNotEmpty) {
      const passwordValid = validation.passwordRegex.test(validation.passwordField.value);
      if (!passwordValid) {
        validation.passwordError.textContent = 'Veuillez saisir un mot de passe valide : 8 caractère minimum avec au moins 1 majuscule et un caractère spécial';
        validation.passwordError.classList.add('is-invalid');
        return;
      }
    }
    if (!confirm(`êtes vous sur de vouloir modifier votre profil?`)) return;
    event.target.submit();
  },

}

const modal = {
  /**
   * function to open allmodal thanks to the data-modal
   */
  openModal: function () {
    const modal = document.querySelector('.' + this.dataset.modal);
    modal.classList.add('active');
  },
  /**
   * function to close all modal
   */
  closeModal: (event) => {
    const closeButton = event.target
    const modal = closeButton.closest('.modal');
    modal.classList.remove('active');
  },

  displayChildInformation: function (child) {
    const childId = child.dataset.childId;
    const childPicture = child.dataset.childPicture;
    const childName = child.dataset.childName;
    const childFirstName = child.dataset.childFirstName;
    const childBirthday = child.dataset.childBirthday;
    const childDescription = child.dataset.childDescription;
    const parentName = child.dataset.parentName;
    const parentFirstName = child.dataset.parentFirstName;

    app.childPictureElement.src = '/public/uploads/' + childPicture;
    app.childNameElement.textContent = childName;
    app.childFirstNameElement.textContent = childFirstName;
    app.childBirthdayElement.textContent = childBirthday;
    app.childDescriptionElement.textContent = childDescription;
    app.parentNameElement.textContent = parentName;
    app.parentFirstNameElement.textContent = parentFirstName;

    app.modal.classList.add('active');
  },

}

document.addEventListener('DOMContentLoaded', app.init);


