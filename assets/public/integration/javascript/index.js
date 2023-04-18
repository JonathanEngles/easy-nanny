var icones = document.querySelectorAll("p i");
for (var i = 0; i < icones.length; i++) {
  icones[i].addEventListener("click", function() {
    var contenu = this.parentElement.nextElementSibling;
    this.classList.toggle("active");
    contenu.classList.toggle("show");
  });
}

// MESSAGE D'ERREUR MDP ET EMAIL
// Fonction pour afficher un message d'erreur
function displayError(element, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'invalid-feedback';
  errorElement.innerText = message;
  element.classList.add('is-invalid');
  element.parentNode.insertBefore(errorElement, element.nextSibling);
}

// VALIDATION EMAIL

const emailInput = document.querySelector('.email');
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail() {
  if (!emailRegex.test(emailInput.value)) {
    displayError(emailInput, 'Email non conforme');
    return false;
  } else {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    return true;
  }
}


// VALIDATION MOT DE PASSE 

const newPasswordInput = document.querySelector('#new-password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,128}$/;

// Fonction pour valider le mot de passe
function validatePassword() {
  if (!passwordRegex.test(newPasswordInput.value)) {
    displayError(newPasswordInput, 'Sécurité insuffisante');
    return false;
  } else {
    newPasswordInput.classList.remove('is-invalid');
    newPasswordInput.classList.add('is-valid');
    return true;
  }
}

// Fonction pour valider la confirmation de mot de passe
function validateConfirmPassword() {
  if (newPasswordInput.value !== confirmPasswordInput.value) {
    displayError(confirmPasswordInput, 'Mots de passe non semblables');
    return false;
  } else {
    confirmPasswordInput.classList.remove('is-invalid');
    confirmPasswordInput.classList.add('is-valid');
    return true;
  }
}


