/**########################### IMPORT ###########################**/
import { getPhotographerId, getCloneTemplate, getGalery, getLikes } from '../functions/get.js';
import { addLike } from './like.js';
import { MediaFactory } from '../factories/Media.js'
/**########################### CONST ###########################**/
const photographerId = getPhotographerId(),
section = document.getElementById('galery-section');

/**########################### FUNCTION ###########################**/
function setArticle(data, sortedGalery) {
    /*========== CONST  ==========*/
    const { id, title, photographerId, likes } = data,
    article = getCloneTemplate('galery-template'),
    header = article.querySelector('.card-header');
    const source = new MediaFactory(data, sortedGalery);
    
    header.appendChild(source.elementThumbnail); // add source
    
    /*========== TITLE ==========*/
    const h2 = article.querySelector('h2');
    h2.textContent = title;

    /*========== LIKES ==========*/
    addLike({ article, id, photographerId, likes })

    article.id = 'article-'+id;
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
    const photographerGalery = await getGalery(photographerId),
    sortedGalery = sortGalery(photographerGalery, sortOption);
    
    section.innerHTML = '';// reset the section
    for (const data of sortedGalery) setArticle(data, sortedGalery);
    getLikes(photographerId);
}