import { MediaFactory } from "../factories/Media.js";

/**########################### CONST ###########################**/
const body = document.querySelector('body'),
photographer = document.getElementById('photographer'),
modal = document.getElementById('modal-galery'),
left = modal.querySelector('.left'),
right = modal.querySelector('.right'),
figure =  modal.querySelector('figure'),
figcaption = document.createElement('figcaption'),
close = modal.querySelector('.modal-galery__close-btn');

/**########################### VARIABLES ###########################**/
var index, data;

/**########################### FUNCTIONS ###########################**/
function updateGalery(data) {
    const { title } = data;
    figure.innerHTML='';

    /*========== SOURCE MEDIA (IMAGE & VIDEO) ==========*/
    const source = new MediaFactory(data);
    figure.appendChild(source.element);

    /*========== FIGCAPTION ==========*/
    figcaption.textContent = title;
    figcaption.className = 'modal-galery__title';
    figcaption.tabIndex = 0;
    figure.appendChild(figcaption);

    /*========== ARROWS ==========*/
    left.addEventListener('click', previousElement);// left-arrow
    right.addEventListener('click', nextElement);// right-arrow

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
    photographer.ariaHidden = false;
    modal.classList.remove('is-open');
    window.removeEventListener('keydown', handleKeydown, false);
}
/**
 * Controls keyboard navigation of the ArrowLeft, ArrowRight, Escape, Enter and Space for the modal galery.
 * @param {event} e event handling.
 */
function handleKeydown (e) {
    const key = e.key,
    activeElement = document.activeElement,
    video = modal.querySelector('video');

    if(key === 'ArrowLeft') previousElement();
    else if(key === 'ArrowRight') nextElement();
    else if(key === 'Escape') closeModal();
    else if (key === ' ' && video && activeElement != video) {
        (video.paused)   
        ?   video.play()
        :   video.pause();
    }
    else if ((e.shiftKey && key === 'Tab') && activeElement == left) {
        close.focus();
    }
    else if(( !e.shiftKey && key === 'Tab' && activeElement == close ) || (activeElement.parentElement != modal && activeElement.parentElement.parentElement != modal) ) {
        modal.focus();
    }
}

/**########################### EVENT LISTENER ###########################**/
close.addEventListener('click', closeModal)
close.addEventListener('keydown', e => {
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