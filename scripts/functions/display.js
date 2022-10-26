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
    const { name, location, tagline, portrait } = photographer,
    main = document.getElementById('photographer'),
    section = getCloneTemplate('photographer-header-template'),
    imgLink =`./assets/photographers/${portrait}/m.jpg`;

    /*========== CONST OF ARTICLE  ==========*/
    const h2 = section.querySelector('h2'),
    details = section.querySelectorAll('span'),
    img = section.querySelector('img');

    /*========== UPDATE PHOTOGRAPHER SECTION ==========*/
    h2.textContent = name; // -> TITLE
    details[0].textContent = location // -> LOCATION
    details[1].textContent = tagline //  -> TAGLINE
    img.src = imgLink; img.alt = name // -> IMAGE

    /*========== ADD SECTION AS FIRST CHILD IN MAIN PAGE PHOTOGRAPHER ==========*/
    main.insertBefore(section, main.firstChild)
}