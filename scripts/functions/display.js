/*######## All functions to display element with DOM ########*/

// imports
import { getUserCardDOM } from '../factories/photographer.js';

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
    templateSection = document.getElementById('photographer-header-template').content.cloneNode(true),
    section = document.getElementById('photographer-header'),
    imgLink =`./assets/photographers/${portrait}/m.jpg`;

    /*========== CLONE PHOTOGRAPHER CARD FROM TEMPLATE HTML  ==========*/
    section.append(templateSection)

    /*========== CONST OF ARTICLE  ==========*/
    const h2 = section.querySelector('h2'),
    details = section.querySelectorAll('span'),
    img = section.querySelector('img');

    /*========== UPDATE PHOTOGRAPHER SECTION ==========*/
    h2.textContent = name; // -> TITLE
    details[0].textContent = location // -> LOCATION
    details[1].textContent = tagline //  -> TAGLINE
    img.src = imgLink; img.alt = name // -> IMAGE
}