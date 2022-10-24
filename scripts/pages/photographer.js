/**########################### IMPORT ###########################**/
import { getPhotographerId, getProfile } from "../functions/get.js";
import { displayProfile } from "../functions/display.js";
import { updateSelect } from "../components/select.js";

/**
 * Init the photographer page, update all élements and display gallery
 */
async function init() {
    const photographerId = getPhotographerId(),
    photographer = await getProfile(photographerId);
    displayProfile(photographer);
    updateSelect();
}
init();