/**########################### IMPORT ###########################**/
import { getPhotographerId, getProfile } from "../functions/get.js";
import { displayProfile } from "../functions/display.js";
import { updateSelect } from "../components/select.js";
import { updateGalery } from "../components/galery.js";

/**
 * Init the photographer page, update all élements and display gallery
 */
async function init() {
    const photographerId = getPhotographerId(),
    photographer = await getProfile(photographerId);
    displayProfile(photographer);
    await updateGalery();
    updateSelect();
}
init();