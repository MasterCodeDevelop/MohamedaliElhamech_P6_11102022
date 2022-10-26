/**########################### IMPORT ###########################**/
import { getPhotographerId, getCloneTemplate, getGalery } from '../functions/get.js';

/**########################### CONST ###########################**/
const photographerId = getPhotographerId(),
photographerGalery = await getGalery(photographerId),
section = document.getElementById('galery-section');

/**########################### FUNCTION ###########################**/
function setArticle(data) {
    /*========== CONST  ==========*/
    const { title, image, video, date, photographerId, likes } = data,
    article = getCloneTemplate('galery-template'),
    header = article.querySelector('.card-header');

    /*========== IMAGE ==========*/
    if(image) {
        const img = document.createElement('img');
        img.className = 'card-img';
        img.src = `./assets/photos/${photographerId}/${image}.jpg`;
        img.alt = title;
        header.appendChild(img);
    }
    /*========== VIDEO ==========*/
    else if (video) {
        const newVideo = document.createElement('video');
        newVideo.className = 'card-video';
        newVideo.src = `./assets/photos/${photographerId}/${video}`;
        header.appendChild(newVideo);
    }
    
    /*========== TITLE ==========*/
    const h5 = article.querySelector('h5');
    h5.textContent = title;

    /*========== LIKES ==========*/
    const span = article.querySelector('span');
    span.textContent = likes;

    section.appendChild(article)
}

/**
 * Sorts the array by date (most recent to oldest), title (alphabetical), popularity (likes decending)
 * @param {array} galery 
 * @param {string} sortOption 
 * @returns {array}
 */
 function sortGalery(galery, sortOption) {
    const sorted = (sortOption=='date')?
        galery.sort((a, b) => a.date.localeCompare(b.date)).reverse()
    :(sortOption=='title')?
        galery.sort((a, b) => a.title.localeCompare(b.title))
    : galery.sort((a, b) => a.likes - b.likes).reverse();
    return sorted;
}

/**########################### EXPORT ###########################**/
/**
 * Update the galery of one photographer
 * @param {string} sortOption value current select
 */
 export async function updateGalery(sortOption) {
    const sortedGalery = sortGalery(photographerGalery, sortOption);
    section.innerHTML = '';// reset the section
    for (const data of sortedGalery) setArticle(data);
}