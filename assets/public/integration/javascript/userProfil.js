// MODIFIER / ENREGISTRER PROFIL
const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');
const form = document.getElementById('form');
const inputs = form.querySelectorAll('input');


editBtn.addEventListener('click', () => {
  inputs.forEach(input => {
    input.readOnly = false;
  });
  editBtn.style.display = 'none';
  saveBtn.style.display = 'block';
});

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  inputs.forEach(input => {
    input.readOnly = true;
  });
  editBtn.style.display = 'block';
  saveBtn.style.display = 'none';
  
});
// EMAIL ET MDP BOUTON
const togglePasswordForm = document.getElementById("toggle-password-form");
const changePasswordForm = document.getElementById("change-password-form");

togglePasswordForm.addEventListener("click", () => {
  changePasswordForm.classList.toggle("d-none");
});


// CLEF DE LIAISON
const clefDeLiaisonInput = document.getElementById('clef-de-liaison');
const afficherClefSpan = document.getElementById('afficher-clef');

clefDeLiaisonInput.addEventListener('click', () => {
  clefDeLiaisonInput.style.display = 'none';
  afficherClefSpan.style.display = 'inline';
});

// VALIDATION MOT DE PASSE ET EMAIL

// On récupère les éléments du formulaire
const emailInput = document.querySelector('#email');
const newPasswordInput = document.querySelector('#new-password');
const confirmPasswordInput = document.querySelector('#confirm-password');

// Regex pour email
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regex pour mot de passe (au moins 8 caractères maximum 128, au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial)
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,128}$/;

// Fonction pour afficher un message d'erreur
function displayError(element, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'invalid-feedback';
  errorElement.innerText = message;
  element.classList.add('is-invalid');
  element.parentNode.insertBefore(errorElement, element.nextSibling);


  // TENTATIVE DE SUPPRESSION DU MESSAGE D ERREUR
  // element.addEventListener(errorElement, function() {
  //   element.classList.remove('is-invalid');
  //   const errorElement = element.parentNode.querySelector('.invalid-feedback');
  //   if (errorElement) {
  //     errorElement.parentNode.removeChild(errorElement);
  //   }
  // });
}

// Fonction pour valider l'email
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

// écouteurs d'événements pour valider les champs
emailInput.addEventListener('blur', validateEmail);
newPasswordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

// BOUTON DE SUPPRESION DE COMPTE

// Récupération du bouton "Supprimer mon compte" et de la fenêtre modale
const deleteBtn = document.getElementById("delete-btn");
const modalYesNo = document.getElementById("modalYesNo");

// Récupération des boutons "Oui" et "Non"
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

// Affichage de la fenêtre modale
deleteBtn.addEventListener("click", () => {
  modalYesNo.classList.toggle("d-none");
});

// Fermeture de la fenêtre modale
noBtn.addEventListener("click", () => { 
  modalYesNo.classList.toggle("d-none");
});
// Redirection vers la route de suppression en back-end
yesBtn.addEventListener("click", () => { 
  window.location.href = "/delete";
});


// ENFANT MODIFIER / ENREGISTRER PROFIL ENFANT
const editBtnChild = document.getElementById('edit-btnChild');
const saveBtnChild = document.getElementById('save-btnChild');
const formChild = document.getElementById('formChild');
const inputsChild = formChild.querySelectorAll('input');


editBtnChild.addEventListener('click', () => {
  inputsChild.forEach(input => {
    input.readOnly = false;
  });
  editBtnChild.style.display = 'none';
  saveBtnChild.style.display = 'block';
});

saveBtnChild.addEventListener('click', (e) => {
  e.preventDefault();
  inputsChild.forEach(input => {
    input.readOnly = true;
  });
  editBtnChild.style.display = 'block';
  saveBtnChild.style.display = 'none';
  
});
