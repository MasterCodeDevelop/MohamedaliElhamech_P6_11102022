const jsonData = await getJsonData();

/**
 *  Fetches the data photographers
 * @returns  {promise} object Json
 */
export async function getJsonData() {
    const response = await fetch('../data/photographers.json');
    return await response.json();
}
/**
 * Gets all photographerss
 * @returns {promise} array of phtographers
 */
export async function getPhotographers() {
    return jsonData.photographers
}
/**
 * Return the photographer ID in profile.html
 * @returns {number} photographerId
 */
export function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
}
/**
 *  Finds the profile data of the photographer.
 * @param {number} photographerId
 * @returns {promise} JSON => Retrieve profile data from its ID in data/photographers.json
 */
 export async function getProfile(photographerId) {
    return jsonData.photographers.find(photographer => photographer.id === photographerId);
}
/**
 * Get to clone the template present with ID in the HTML page
 * @param {string} ID 
 * @returns {DocumentFragment}
 */
export function getCloneTemplate(ID) {
    return document.getElementById(ID).content.cloneNode(true).firstElementChild;
}
/**
 * Get last photographer's galery from the session storage. 
 * If not exists set them in local storage.
 * @param {number} photographerId 
 * @returns {promise} array of objects (photographer's media) in data/photographers.json
 */
export async function getGalery(photographerId) {
    let sessionGalery = JSON.parse(sessionStorage.getItem(photographerId));

    if (!sessionGalery) {
        sessionGalery = jsonData.media.filter(e => e.photographerId === photographerId);
        sessionStorage.setItem(photographerId, JSON.stringify(sessionGalery));
    }
    return sessionGalery;
};