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