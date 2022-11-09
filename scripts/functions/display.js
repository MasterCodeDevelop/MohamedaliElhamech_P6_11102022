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
}
/**
 * Update data of the photographer profile header to profile.html
 * @param {JSON} photographer
 */
 export async function displayProfile(photographer) {
    /*========== CONST ==========*/
    const { name, country, city, tagline, portrait, price } = photographer,
    photographerPrice = document.getElementById('photographerPrice'),
    section = document.getElementsByClassName('photographer-header')[0],
    imgLink =`../assets/photographers/${portrait.slice(0, portrait.length-4)}/m.jpg`,
    h1 = section.querySelector('h1'),
    details = section.querySelectorAll('span'),
    img = section.querySelector('img');

    /*========== UPDATE PHOTOGRAPHER SECTION ==========*/
    h1.textContent = name; // -> TITLE
    details[0].textContent = country+', '+city // -> LOCATION
    details[1].textContent = tagline //  -> TAGLINE
    img.src = imgLink; img.alt = name // -> IMAGE
    photographerPrice.textContent = price+'/jour' // add price/day in the div likes

}