/**########################### CONST ###########################**/
const cards = document.getElementsByClassName('card'),
modal = document.getElementById('modal-galery'),
arrows = modal.querySelectorAll('a'),
figure =  modal.querySelector('figure'),
figcaption = document.createElement('figcaption'),
btn = modal.querySelector('button');


/**########################### FUNCTIONS ###########################**/
function closeModal() {
    modal.style.display = 'none';
}
function updateGalery(data) {
    const { photographerId, image, video, title } = data;
    figure.innerHTML='';
    /*========== IMAGE ==========*/
    if(image) {
        const img = document.createElement('img');
        img.src = `./assets/photos/${photographerId}/${image}.jpg`;
        img.alt = title;
        figure.appendChild(img);
    }
    /*========== VIDEO ==========*/
    else if (video) {
        const newVideo = document.createElement('video');
        newVideo.className = 'card-video1';
        newVideo.controls=true;
        newVideo.src = `./assets/photos/${photographerId}/${video}`;
        figure.appendChild(newVideo);
    }

    figcaption.textContent = title;
    figcaption.className = 'modal-galery__title';
    figcaption.tabIndex = 0;
    figure.appendChild(figcaption);

}

/**########################### EVENT LISTENER ###########################**/
btn.addEventListener('click', closeModal)
btn.addEventListener('keydown', e => {
    if(e.key === 'Enter') closeModal();
})

/**########################### EXPORT ###########################**/
export function show(galeryID, data) {
    var index = data.findIndex(e => e.id === galeryID);
    //=== change to previous photo/video ===//
    const previousElement = () => {
        index = (index==0)
        ?   data.length-1
        : index-1;
        updateGalery(data[index]);
    },
    //=== change to next photo/video ===//
    nextElement = () => {
        index = (index==(data.length-1))
        ?   0
        : index+1;
        updateGalery(data[index]);
    },
    close = () => {
        const cardImg = (data[index].image) 
        ?   cards[index].querySelector('img')
        :   cards[index].querySelector('video');
        
        cardImg.focus();
        window.removeEventListener('keydown', handleKeydown, true)
        closeModal();
    },
    handleKeydown = (e) => {
        e.preventDefault();

        if(e.key === 'ArrowLeft') previousElement();
        else if(e.key === 'ArrowRight') nextElement();
        else if(e.key === 'Escape') close();
        else if (e.key === ' ') {
            const video = modal.querySelector('video');
            if(video) (video.paused)   
            ?   video.play()
            :   video.pause();
            
        }
    }
    updateGalery(data[index])
    arrows[0].addEventListener('click', previousElement)
    arrows[1].addEventListener('click', nextElement)
    btn.addEventListener('click', close)
    modal.style.display= 'flex';
    window.addEventListener('keydown', handleKeydown, true);
}