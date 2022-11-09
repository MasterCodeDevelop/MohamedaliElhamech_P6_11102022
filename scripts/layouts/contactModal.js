/**########################### CONST ###########################**/
/**######### DOM ELEMENTS #########**/
const body = document.querySelector('body'),
main = document.querySelector('main'),
modal = document.getElementById('contact-modal'),
close = modal.querySelector('#close-modal'),
title = modal.querySelector('h2'),
form = modal.querySelector('form'),
firstName = document.getElementById('firstname'),
lastName = document.getElementById('lastname'),
email = document.getElementById('email'),
message = document.getElementById('message'),
submit = modal.querySelector('button[type="submit"]');

/**######### REGEX #########**/
const RegName = /^[a-zA-Z\- ]{2,20}$/i,
RegMail = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i;

/**######### DATA #########**/
const dataTest = {
    firstName: {
      void: "Veuillez entrer votre prénom.",
      min: [2, "Veuillez entrer 2 caractères ou plus pour le champ du prénom."],
      max: [40, "Votre prénom doit avoir au maximum 40 caractères."],
      regex: [RegName, "Veuillez entrer un prénom correct."]
    },
    lastName: {
      void: "Veuillez entrer votre nom.",
      min: [2, "Veuillez entrer 2 caractères ou plus pour le champ du nom."],
      max: [40, "Votre nom doit avoir au maximum 40 caractères."],
      regex: [RegName, "Veuillez entrer un nom correct."]
    },
    email: {
      void: "Veuillez entrer votre adresse email",
      max: [100, "Votre email doit avoir au maximum 100 caractères."],
      regex: [RegMail, "Veuillez entrer un email correct."]
    },
    message: {
        void: "Veuillez entrer votre message",
        min: [10, "Veuillez entrer 10 caractères ou plus pour le champ du nom."],
        max: [200, "Votre message doit avoir au maximum 200 caractères."],
    }
}
/**######### FUNCTIONS #########**/
/**
 * Open the modal
 */
function openModal() {
    body.classList.add("no-scroll");
    main.ariaHidden = true;
    modal.classList.add("is-open");
    modal.ariaHidden = false;
    modal.focus();

    window.addEventListener('keydown', handleKeydown, false);// keydown control
}
/**
 * close the modal
 */
function closeModal() {
    body.classList.remove("no-scroll");
    main.ariaHidden = false;
    modal.classList.remove("is-open");
    modal.ariaHidden = true;
    window.removeEventListener('keydown', handleKeydown, false);
}
/**
 * Display the error message
 * @param {Element} parentElement 
 * @param {string} message 
 */
function displayDataError(parentElement, message) {
    parentElement.setAttribute("data-error",message);
    parentElement.setAttribute("data-error-visible", "true");
} 
/**
 * removes the error message
 * @param {Element} parentElement 
 * @returns boolean
 */
function removeDataErrror(parentElement) {
    if (parentElement.getAttribute("data-error") || parentElement.getAttribute("data-error-visible")) {
        parentElement.removeAttribute("data-error");
        parentElement.removeAttribute("data-error-visible");
    }
    return true;
}
/**
 * Verify if have or not the error
 * @param {Event} e 
 * @param {Object} dataTest 
 * @returns 
 */
function verify(e, dataTest){
    let { value, parentElement } = e,
    length = value.length - (value.split(" ").length-1),
    { min, max, regex } = dataTest;
  
    // All control test
    if (dataTest.void && length == 0) displayDataError(parentElement, dataTest.void);
    else if(min && length < min[0]) displayDataError(parentElement, min[1]);
    else if(min && length > max[0]) displayDataError(parentElement, max[1]);
    else if(regex && !regex[0].test(value)) displayDataError(parentElement, regex[1]);
    else return removeDataErrror(parentElement);
}
/**######### All controll valid form  #########**/
const verifyFirstName = () => verify(firstName, dataTest.firstName),
verifyLastName = () => verify(lastName, dataTest.lastName),
verifyEmail = () => verify(email, dataTest.email),
verifyMessage = () => verify(message, dataTest.message);

/**
 * If submit form controll all input
 * @param {Event} e 
 */
function formSubmit(e) {
    e.preventDefault();

    if(verifyFirstName() && verifyLastName() && verifyEmail() && verifyMessage()) {
        alert('votre message a été bien envoyé');
        form.reset();
        closeModal();
    }

}
/**
 * Controls keyboard navigation of Shift and Tab in the contact modal .
 * @param {event} e event handling.
 */
function handleKeydown (e) {
    const keyCode = e.keyCode ? e.keyCode : e.which,
    activeElement = document.activeElement;

    if( (!e.shiftKey && keyCode === 9) && activeElement == submit) {
        modal.focus();
    } else if (e.shiftKey && keyCode === 9 && activeElement == close) {
        submit.focus();
    }
}

/**########################### EXPORTS ###########################**/
/**
 * Update and control the contact modal
 * @param {Object} photographer 
 */
export function contactModal(photographer) {
    const open = document.getElementById('openContactModal');

    title.innerHTML = 'Contactez-moi <br>'+photographer.name; // update title

    /**############### EventListener ###############**/
    open.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);
    form.addEventListener('submit', formSubmit);
    firstName.addEventListener("focusout", verifyFirstName);// verify First Name
    lastName.addEventListener("focusout", verifyLastName); // Verify last Name
    email.addEventListener("focusout", verifyEmail);// Verify Email
    message.addEventListener("focusout", verifyMessage);// Verify Message
}