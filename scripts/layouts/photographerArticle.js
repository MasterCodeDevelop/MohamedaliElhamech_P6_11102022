import { getCloneTemplate } from "../functions/get.js";

/**
 * Create the photographer article
 * @param {Array} data 
 * @returns article element
 */
export function photographerArticle(data) {

    /*========== CONST ==========*/
    const { id, name, portrait, city, country, tagline, price } = data,
    article = getCloneTemplate('photographer-article'),
    imgLink =`./assets/photographers/${portrait.slice(0, portrait.length-4)}/`,
    a = article.querySelector('a'),
    sources = article.querySelectorAll('source'),
    img = article.querySelector('img'),
    h2 = article.querySelector('h2'),
    h3 = article.querySelector('h3'),
    details = article.querySelectorAll('span');

    /*========== UPDATE ARTICLE  ==========*/
    a.href = `./pages/photographer.html?id=${id}`;// -> LINK
    h2.ariaLabel = name; h2.textContent = name;// -> TITLE/NAME
    h3.textContent = city + ', ' + country; // -> LOCATION
    details[1].textContent = tagline; // -> TAGLINE
    details[1].textContent = price + "€/jour";// -> PRICE
    // PICTURE:
    sources[0].srcset = imgLink+"s.jpg";
    sources[1].srcset = imgLink+"m.jpg";
    sources[2].srcset = imgLink+"l.jpg";
    img.src = imgLink+"xl.jpg";
    img.alt = name;

    return (article);
}