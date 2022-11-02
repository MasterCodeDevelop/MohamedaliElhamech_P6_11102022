/*######## All functions to display element with DOM ########*/

// imports
import { getUserCardDOM } from '../factories/photographer.js';
import { getCloneTemplate } from './get.js';

/**
 *  photographers articles in DOM (index.html)
 * @param {array} photographers 
 */
export async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach(photographer => {
        const userCardDOM = getUserCardDOM(photographer);
        photographersSection.appendChild(userCardDOM);
    });
};
/**
 * Update data of the photographer profile header to profile.html
 * @param {JSON} photographer
 */
 export async function displayProfile(photographer) {
    /*========== CONST ==========*/
    const { name, country, city, tagline, portrait } = photographer,
    main = document.getElementById('photographer'),
    section = getCloneTemplate('photographer-header-template'),
    imgLink =`../assets/photographers/${portrait.slice(0, portrait.length-4)}/m.jpg`;

    /*========== CONST OF ARTICLE  ==========*/
    const h1 = section.querySelector('h1'),
    details = section.querySelectorAll('span'),
    btn = section.querySelector('button'),
    img = section.querySelector('img');

    /*========== UPDATE PHOTOGRAPHER SECTION ==========*/
    h1.textContent = name; // -> TITLE
    details[0].textContent = country+', '+city // -> LOCATION
    details[1].textContent = tagline //  -> TAGLINE
    btn.addEventListener('click', e => {
        const body = document.querySelector('body'),
        modal = document.getElementById('contact-modal');

        body.classList.add("scroll-hidden");
        modal.classList.add("is-open");
        modal.ariaHidden = false;
    })
    img.src = imgLink; img.alt = name // -> IMAGE

    /*========== ADD SECTION AS FIRST CHILD IN MAIN PAGE PHOTOGRAPHER ==========*/
    main.insertBefore(section, main.firstChild)
}