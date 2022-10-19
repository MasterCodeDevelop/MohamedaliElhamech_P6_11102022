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
    a.href = `./profile.html?id=${id}`;

    // image
    const img = document.createElement( 'img' );
    img.src = `assets/photographers/${portrait}`;
    img.className = 'photographer-article__picture';

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
    a.appendChild(img);
    a.appendChild(h2);
    a.appendChild(locationHeading);
    a.appendChild(taglineSpan);
    a.appendChild(priceSpan);
    article.appendChild(a);
    
    return (article);
}