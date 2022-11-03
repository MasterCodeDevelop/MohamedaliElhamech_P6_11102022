// imports
import { getPhotographers } from '../functions/get.js';
import { displayPhotographers } from '../functions/display.js';

/**
 * Init the page and display all élements
 */
async function init() {
    const photographers = await getPhotographers();
    displayPhotographers(photographers);
}

init();
