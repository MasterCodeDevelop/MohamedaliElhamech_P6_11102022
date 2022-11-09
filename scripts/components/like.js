import { getLikes } from "../functions/get.js";

/**
 * Add all elements of the like
 * @param {any} props 
 */
export function addLike(props) {
    //################## CONST ##################//
    const { article, id, photographerId, likes } = props,
    like = article.querySelector('button');

    //################## FUNCTIONS ##################//

    /** get the array JSON photographer Likes from session Storage
     * @returns {Promise} array of objects in sessionStorage
     */
    function getSession() {
        const key = photographerId+'-likes',
        photographerLikes = sessionStorage.getItem(key);
        return JSON.parse(photographerLikes);
    }
    /**
     * set this array in sessionStorage
     * @param {array} photographerLikes 
     */
    function setSession(photographerLikes){
        const key = photographerId+'-likes',
        value = JSON.stringify(photographerLikes);
        sessionStorage.setItem(key, value)
    }
    /**
     * if click to like change and update the total likes
     */
    function onChangeLike() {
        let photographerLikes = getSession();
    
        if(!photographerLikes) { 
            photographerLikes = [];
            setSession(photographerLikes); 
        }
    
        const index = photographerLikes.findIndex(e => e === id);
        if (index == -1) {
            photographerLikes.push(id);
            like.textContent = likes +1;
            like.classList.add('is-liked');
        } else {
            photographerLikes.splice(index,1);
            like.textContent = likes;
            like.classList.remove('is-liked');
        }
        setSession(photographerLikes);
        getLikes(photographerId);
    }
    /**
     * Initial the like in relation to the last sessionStorage
     * @param {Element} like element in the card of galery photographer
     */
    function initialLike(like) {
        const photographerLikes = getSession();
        if (photographerLikes == null) {
            like.textContent = likes;
        }else {
            const index = photographerLikes.findIndex(e => e === id);
            if (index == -1) {
                like.textContent = likes;
            } else {
                like.textContent = likes + 1;
                like.classList.add('is-liked');
            }
        }
    }

       
    //################## SCRIPT/EXECUTE ##################//
    initialLike(like)
    like.addEventListener('click', onChangeLike);
}