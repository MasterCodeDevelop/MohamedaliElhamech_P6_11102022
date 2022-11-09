import { show } from "../components/galeryModal.js";

export class MediaFactory {
  constructor(data, sortedGalery) {
    if (data.image) return new MediaImage(data, sortedGalery);
    else if (data.video) return new MediaVideo(data, sortedGalery);
    else throw "MediaFactory Error : Unkown type";
  }
}
 
class MediaImage{
  constructor(data, sortedGalery) {
    this.id = data.id;
    this.title = data.title
    this.thumbnail = `../assets/photos/${data.photographerId}/${data.image.slice(0, data.image.length-4)}-light.jpg`;
    this.img = `../assets/photos/${data.photographerId}/${data.image}`;

    // Media Element
    this.$e = document.createElement('img');
    this.$e.setAttribute('tabindex', '0');
    this.$e.classList.add('card-source');
    this.$e.setAttribute('alt', this.title);
    this.$e.addEventListener('click', () => show(this.id, sortedGalery));
    this.$e.addEventListener('keydown', e => {
        if(e.key === 'Enter') show(this.id, sortedGalery);
    })
    this.$e.setAttribute('data-open', 'lightbox');

  }
  
  get elementThumbnail() {
    this.$e.setAttribute('src', this.thumbnail);
    return this.$e;
  }

  get element() {
    this.$e.setAttribute('src', this.img);
    return this.$e;
  }
}


class MediaVideo {
  constructor(data, sortedGalery) {
    this.id = data.id;
    this.title = data.title
    this.video = data.video;
    this.thumbnail = `../assets/photos/${data.photographerId}/${data.video.slice(0, data.video.length-4)}.jpg`;
    this.video = `../assets/photos/${data.photographerId}/${data.video}`;
    this.sortedGalery = sortedGalery;
  }

  get elementThumbnail() {
    // Media Element
    this.$e = document.createElement('img');
    this.$e.setAttribute('tabindex', '0');
    this.$e.classList.add('card-source');
    this.$e.setAttribute('data-open', 'lightbox');
    this.$e.addEventListener('click', () => show(this.id, this.sortedGalery));
    this.$e.addEventListener('keydown', e => {
      if(e.key === 'Enter') show(this.id, this.sortedGalery);
    })
    this.$e.setAttribute('src', this.thumbnail);
    return this.$e;
  }

  get element() {
    // Media Element
    this.$e = document.createElement('video');
    this.$e.setAttribute('tabindex', '0');
    this.$e.classList.add('card-source');
    this.$e.setAttribute('data-open', 'lightbox');
    this.$e.setAttribute('src', this.video);
    this.$e.controls = true;
    return this.$e;
  }
}