/**
 * Create the photographer article
 * @param {Array} data 
 * @returns article element
 */
export function photographerArticle(data) {
    /*========== CONST ==========*/
    const { id, name, portrait, city, country, tagline, price } = data,
    templateArticle = document.getElementById('photographer-article').content.cloneNode(true),
    article = document.createElement('article'),
    imgLink =`./assets/photographers/${portrait}/`;

    /*========== CLONE PHOTOGRAPHER CARD FROM TEMPLATE HTML  ==========*/
    article.className = 'photographer-article'; 
    article.append(templateArticle);

    /*========== CONST OF ARTICLE  ==========*/
    const a = article.querySelector('a'),
    sources = article.querySelectorAll('source'),
    img = article.querySelector('img'),
    h2 = article.querySelector('h2'),
    h3 = article.querySelector('h3'),
    spans = article.querySelectorAll('span');

    /*========== UPDATE ARTICLE  ==========*/
    /*## LINK ##*/
    a.href = `./photographer.html?id=${id}`;
    /*## PICTURE ##*/
    sources[0].srcset = imgLink+"s.jpg";
    sources[1].srcset = imgLink+"m.jpg";
    sources[2].srcset = imgLink+"l.jpg";
    img.src = imgLink+"xl.jpg";
    img.alt = name;
    /*## TITLE ##*/
    h2.ariaLabel = name;
    h2.textContent = name;
    /*## LOCATION ##*/
    h3.textContent = name;
    /*## TAGLINE ##*/
    spans[1].textContent = tagline;
    /*## PRICE ##*/
    spans[1].textContent = price + "€/jour";

    return (article);
}