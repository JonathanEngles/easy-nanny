const modal = {

    formLogin: document.querySelector('.login-form'),
    formSignUp: document.querySelector('.signup-form'),

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

   /**
    * function to change the action of the register form to create a parent
    */
    selectParentRegister: (event) => {
        const parent = event.target
        const nanny = parent.previousElementSibling;
        modal.formSignUp.setAttribute('action', '/parent/signup');
        parent.classList.remove('is-not-clicked');
        nanny.classList.add('is-not-clicked');

    },
   /**
    * function to change the action of the register form to create a nanny
    */
    selectNannyRegister : (event) => {
        const nanny = event.target
        const parent = nanny.nextElementSibling;
        modal.formSignUp.setAttribute('action', '/nanny/signup');
        nanny.classList.remove('is-not-clicked');
        parent.classList.add('is-not-clicked');
    },


    /**
    * function to change the action of the login form to log a parent
    */
    selectParentLogin : (event) => {
        const parent = event.target
        const nanny = parent.previousElementSibling;
        modal.formLogin.setAttribute('action', '/parent/login');
        parent.classList.remove('is-not-clicked');
        nanny.classList.add('is-not-clicked');
    },

    /**
    * function to change the action of the login form to log a nanny
    */
    selectNannyLogin: (event) => {
        const nanny = event.target
        const parent = nanny.nextElementSibling;
        modal.formLogin.setAttribute('action', '/nanny/login');
        nanny.classList.remove('is-not-clicked');
        parent.classList.add('is-not-clicked');
    },



/**
 * Function validate the form
 */
submitFormRegister: (event) => {
    event.preventDefault();

    const selectedRole = document.querySelector('.nanny-register.is-not-clicked, .parent-register.is-not-clicked, .nanny-login.is-not-clicked, .parent-login.is-not-clicked');
    const emailValid = validation.emailRegex.test(validation.emailField.value);
    const passwordValid = validation.passwordRegex.test(validation.passwordField.value);
    if(!selectedRole) {
        Toastify({
            text: 'Veuillez sélectionner un rôle (Parent ou Nounou) avant de continuer.',
            duration: 3000, 
            close: true,
            gravity: 'top', 
            position: 'center', 
            backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
          }).showToast();
    } else if (!emailValid) {
        validation.emailError.textContent = 'Veuillez saisir une adresse email valide';
        validation.emailError.classList.add('is-invalid');
    } 
    else if (!passwordValid) {
        validation.passwordError.textContent = 'Veuillez saisir un mot de passe valide : 8 caractère minimum avec au moins 1 majuscule et un caractère spécial';
        validation.passwordError.classList.add('is-invalid');
    }else {

        event.target.submit();
    }
},
    submitFormLogin: (event) => {
        event.preventDefault();

        const selectedRole = document.querySelector('.nanny-register.is-not-clicked, .parent-register.is-not-clicked, .nanny-login.is-not-clicked, .parent-login.is-not-clicked');

        if(!selectedRole) {
            Toastify({
                text: 'Veuillez sélectionner un rôle (Parent ou Nounou) avant de continuer.',
                duration: 3000, 
                close: true,
                gravity: 'top', 
                position: 'center', 
                backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
              }).showToast();
        } else {

            event.target.submit();
        }
    },
   
}