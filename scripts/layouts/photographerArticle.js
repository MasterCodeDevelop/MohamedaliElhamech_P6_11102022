/**
 * Create the photographer article
 * @param {Array} data 
 * @returns article element
 */
export function photographerArticle(data) {
    /*===== data for one photographer =====*/
    const { id, name, portrait, city, country, tagline, price } = data;

    /*===== Create all element of photographer card  =====*/
    // Article
    const article = document.createElement('article');
    article.className = 'photographer-article';
    
    // link
    const a = document.createElement('a');
    a.href = `./photographer.html?id=${id}`;

    // image
    const img = document.createElement( 'img' );
    img.src = `assets/photographers/${portrait}`;
    img.className = 'photographer-article__picture';
    a.alt = name;

    // title
    const h2 = document.createElement('h2');
    h2.className = 'photographer-article__name';
    h2.ariaLabel = name;
    h2.textContent = name;

    // City, Country
    const locationHeading = document.createElement('h3');
    locationHeading.textContent = city + ', ' + country;
    locationHeading.classList.add("photographer-article__location")

    // Tagline
    const taglineSpan = document.createElement('span');
    taglineSpan.textContent = tagline;
    taglineSpan.classList.add("photographer-article__tagline");

    // Price
    const priceSpan = document.createElement( 'span' );
    priceSpan.textContent = price + "€/jour";
    priceSpan.classList.add("photographer-article__price");
    
    /*===== Append all element to link then to article =====*/
    // apend to link
    a.appendChild(img);
    a.appendChild(h2);

    // append to the article
    article.appendChild(a);
    article.appendChild(locationHeading);
    article.appendChild(taglineSpan);
    article.appendChild(priceSpan);
    
    return (article);
}