const validation = {
    emailField: document.querySelector('#email'),
    emailError: document.querySelector('#email-error'),
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    passwordField: document.querySelector('#password'),
    passwordError: document.querySelector('#password-error'),
    passwordRegex: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{[\]\\:";'<>?,./])[A-Za-z0-9!@#$%^&*()_+~`|}{[\]\\:";'<>?,./]{8,}$/,

    zip_codeField: document.querySelector('#zip_code'),
    zip_codeError: document.querySelector('#zip_code-error'),
    zip_codeRegex: /^[0-9]{5}$/,

    

    validateEmail: function()  {
        const value = validation.emailField.value;
        const isValid = validation.emailRegex.test(value);
        if (!isValid) {
            validation.emailError.textContent = 'Veuillez saisir une adresse email valide';
           validation.emailError.classList.add('is-invalid');
        } else {
            validation.emailError.classList.remove('is-invalid');
    }
},

validatePassword: function()  {
    const value = validation.passwordField.value;
    const isValid = validation.passwordRegex.test(value);
    if (!isValid) {
        validation.passwordError.textContent = 'Veuillez saisir un mot de passe valide : 8 caractère minimum, au moins 1 majuscule et un caractère spécial';
       validation.passwordError.classList.add('is-invalid');
    } else {
        validation.passwordError.classList.remove('is-invalid');
}
},


validateZipCode: function()  {
    const value = validation.zip_codeField.value;
    const isValid = validation.zip_codeRegex.test(value);
    if (!isValid) {
        validation.zip_codeError.textContent = 'Veuillez saisir code postal valide';
       validation.zip_codeError.classList.add('is-invalid');
    } else {
        validation.zip_codeError.classList.remove('is-invalid');
}
},

init: function() {
    //event on input ta validate Inputs
validation.emailField.addEventListener('input', validation.validateEmail);
validation.passwordField.addEventListener('input', validation.validatePassword);
validation.zip_codeField.addEventListener('input', validation.validateZipCode);

},

};

document.addEventListener('DOMContentLoaded', validation.init);


