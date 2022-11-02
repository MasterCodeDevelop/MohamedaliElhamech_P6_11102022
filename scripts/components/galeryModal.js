/**########################### CONST ###########################**/
const body = document.querySelector('body'),
photographer = document.getElementById('photographer'),
cards = document.getElementsByClassName('card'),
modal = document.getElementById('modal-galery'),
arrows = modal.querySelectorAll('a'),
figure =  modal.querySelector('figure'),
figcaption = document.createElement('figcaption'),
btn = modal.querySelector('button');

/**########################### VARIABLES ###########################**/
var index, data;

/**########################### FUNCTIONS ###########################**/
function updateGalery(data) {
    const { photographerId, image, video, title } = data;
    figure.innerHTML='';

    /*========== SOURCE MEDIA (IMAGE & VIDEO) ==========*/
    const source = (image)
        ?document.createElement('img')
        :document.createElement('video');
    source.src = `../assets/photos/${photographerId}/${image?image:video}`;
    source.setAttribute('alt', title);
    source.ariaLabel="image closeup view"
    source.tabIndex = 0;
    if(video)source.controls = true;
    figure.appendChild(source);

    /*========== FIGCAPTION ==========*/
    figcaption.textContent = title;
    figcaption.className = 'modal-galery__title';
    figcaption.tabIndex = 0;
    figure.appendChild(figcaption);

    /*========== ARROWS ==========*/
    arrows[0].addEventListener('click', previousElement);// left-arrow
    arrows[1].addEventListener('click', nextElement);// right-arrow

    /*========== ARRIA ==========*/
    photographer.ariaHidden = true;
    modal.ariaHidden = false;
    modal.focus();

    body.classList.add('no-scroll'); // hidden the body scroll
    photographer.classList.add('no-scroll'); // hidden the body scroll
    modal.classList.add('is-open');// display the modal
    window.addEventListener('keydown', handleKeydown, false);// keydown control
}
/**
 * change to previous photo/videochange to previous photo/video
 */
function previousElement() {
    index = (index==0)? data.length-1 : index-1;
    updateGalery(data[index]);
}
/**
 * change to next photo/video
 */
function nextElement() {
    index = (index==(data.length-1))? 0 : index+1;
    updateGalery(data[index]);
}
/**
 * Close the modal and focus the last show element (photo/video)
 */
function closeModal() {
    const article = document.getElementById('article-'+data[index].id),
    cardSource = article.querySelector('.card-header').firstChild;
    
    /*========== ARRIA ==========*/
    photographer.ariaHidden = false;
    modal.ariaHidden = true;
    cardSource.focus();

    /*========== REMOVE ==========*/
    body.classList.remove('no-scroll');
    photographer.classList.remove('no-scroll');
    modal.classList.remove('is-open');
    window.removeEventListener('keydown', handleKeydown, false);
}
/**
 * Controls keyboard navigation of the ArrowLeft, ArrowRight, Escape, Enter and Space for the modal galery.
 * @param {event} e event handling.
 */
function handleKeydown (e) {
    const keyCode = e.keyCode ? e.keyCode : e.which,
    activeElement = document.activeElement,
    video = modal.querySelector('video');
    if(keyCode === 37) previousElement();//ArrowLeft
    else if(keyCode === 39) nextElement();//ArrowRight
    else if(keyCode === 27) closeModal(); // Escape
    else if (keyCode === 32) {
        if(video && activeElement != video) (video.paused)   
        ?   video.play()
        :   video.pause();
    }/* Space */
    else if ((e.shiftKey && keyCode === 9) && activeElement == arrows[0]) {
        btn.focus();
    }
    else if(( !e.shiftKey && keyCode === 9 && activeElement == btn ) || (activeElement.parentElement != modal && activeElement.parentElement.parentElement != modal) ) {
        modal.focus();
    }
}

/**########################### EVENT LISTENER ###########################**/
btn.addEventListener('click', closeModal)
btn.addEventListener('keydown', e => {
    if(e.key === 'Enter') closeModal();
})

/**########################### EXPORT ###########################**/
export function show(galeryID, DATA) {
    // update variables
    index = DATA.findIndex(e => e.id === galeryID);
    data = DATA;
    
    // update the galery sections
    updateGalery(data[index]);
}