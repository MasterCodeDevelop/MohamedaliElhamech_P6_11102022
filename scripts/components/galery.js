/**########################### IMPORT ###########################**/
import { getPhotographerId, getCloneTemplate, getGalery } from '../functions/get.js';

/**########################### CONST ###########################**/
const photographerId = getPhotographerId(),
photographerGalery = await getGalery(photographerId),
section = document.getElementById('galery-section');



function setArticle(data) {
    /*========== CONST  ==========*/
    const { title, image, video, date, photographerId, likes } = data;
    const article = getCloneTemplate('galery-template');

    /*========== HEADER ==========*/
    const header = article.querySelector('.card-header');
    // IMG
    if(image) {
        const img = document.createElement('img');
        img.className = 'card-img';
        img.src = `./assets/photos/${photographerId}/${image}.jpg`;
        img.alt = title;
        header.appendChild(img);
    }
    // VIDEO
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
 * Update the galery of one photographer
 * 
 */
 export async function updateGalery() {
    
    for (const data of photographerGalery) setArticle(data);
}