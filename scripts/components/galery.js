/**########################### IMPORT ###########################**/
import { getPhotographerId, getCloneTemplate, getGalery } from '../functions/get.js';
import { show } from './galeryModal.js';

/**########################### CONST ###########################**/
const photographerId = getPhotographerId(),
photographerGalery = await getGalery(photographerId),
section = document.getElementById('galery-section');

/**########################### FUNCTION ###########################**/
function setArticle(data, sortedGalery) {
    /*========== CONST  ==========*/
    const { id, title, image, video,  photographerId, likes } = data,
    article = getCloneTemplate('galery-template'),
    header = article.querySelector('.card-header'),
    
    /*========== SOURCE MEDIA (IMAGE & VIDEO) ==========*/
    source = (image)
        ?document.createElement('img')
        :document.createElement('video');
    source.className = 'card-source';
    source.src = `../assets/photos/${photographerId}/${image?image:video}`;
    source.setAttribute('alt', title + ', closeup view');
    source.tabIndex = 0;
    source.addEventListener('click', () => show(id, sortedGalery));
    source.addEventListener('keydown', e => {
        if(e.key === 'Enter') show(id, sortedGalery);
    })
    if (video) header.classList.add('video');
    header.appendChild(source);
    
    /*========== TITLE ==========*/
    const h5 = article.querySelector('h5');
    h5.textContent = title;

    /*========== LIKES ==========*/
    const span = article.querySelector('span');
    span.textContent = likes;

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
    const sortedGalery = sortGalery(photographerGalery, sortOption);
    section.innerHTML = '';// reset the section
    for (const data of sortedGalery) setArticle(data, sortedGalery);
}