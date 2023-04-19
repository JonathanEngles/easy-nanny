
let modal = null
const focusableSelector = "button, a, input, textarea"
let focusables = []
let previouslyFocusedElement = null


// OUVERTURE de la modale d'inscription / login
const openModal = function (e) {
  e.preventDefault()
  modal = document.querySelector(e.target.getAttribute('href'))
  focusables = Array.from(modal.querySelectorAll(focusableSelector))
  previouslyFocusedElement = document.querySelector(':focus')
  modal.style.display = null
  focusables[0].focus()
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}


//FERMETURE de la modale d'inscription / login
const closeModal = function (e) {
  if (modal === null) return
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
  e.preventDefault()
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
  modal = null
}

const stopPropagation = function (e) {
  e.stopPropagation()
}
// NAVIGATION AU CLAVIER
// RECULER DANS LE FORMULAIRE
const focusInModal = function (e) {
  e.preventDefault()
  let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
  if (e.shiftKey === true) {
    index--
  } else {
    index++
  }
  if (index >= focusables.length) {
    index = 0
  }
  if (index < 0) {
    index = focusables.length - 1
  }
  focusables[index].focus()
}

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)
})
//SORTIR DU FORMULAIRE AVEC ECHAP
window.addEventListener('keydown', function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e)
  } // AVANCER LE FOCUS AVEC TAB
  if (e.key === 'Tab' && modal !== null) {
    focusInModal(e)
  }
})

const UserSelectors = function () {
  const parentElement = document.querySelector('.parent');
  const nannyElement = document.querySelector('.nanny');
  const formSignUp = document.querySelector('.signUpForm');
  const formLogin = document.querySelector('.loginForm');
  parentElement.addEventListener('click', () =>{ console.log('clicked')
    formSignUp.setAttribute('action', '/parent/signup');
    formLogin.setAttribute('action', '/parent/login');
    parentElement.classList.add('is-clicked');
    nannyElement.classList.remove('is-cliked');
   
})
nannyElement.addEventListener('click', () =>{
  formSignUp.setAttribute('action', '/nanny/signup');
  formLogin.setAttribute('action','/nanny/login');
  nannyElement.classList.add('is-clicked');
  nannyElement.classList.remove('is-cliked');
})

;
} 
UserSelectors()
