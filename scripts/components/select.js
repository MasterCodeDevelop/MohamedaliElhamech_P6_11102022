import { updateGalery } from "./galery.js";

/**########################### CONST ###########################**/
const dropdown = document.getElementById('dropdown'),
select = document.getElementById('select'),
currentOption = document.getElementById('current-option');

/**########################### FUNCTIONS ###########################**/

/**
 * Show options group. Adds keyboard Event Listeners.
 */
function openSelect() {
    select.ariaExpanded = true;
    select.ariaHidden = false;
    select.focus();
    currentOption.style.display = "none";
    dropdown.classList.add('is-open');    
    window.addEventListener('keydown', handleKeydown, true);
}

/**
 * Hidden options group. Remove keyboard Event Listeners.
 */
function closeSelect() {
    select.ariaExpanded = false;
    select.ariaHidden = true;
    dropdown.classList.remove('is-open');
    currentOption.style.display = "block";
    window.removeEventListener('keydown', handleKeydown, true);
}

/**
 * Controls keyboard navigation of the ArrowUp, ArrowDown, Home, End, Escape, and Enter drop-down list.
 * @param {event} e event handling.
 */
function handleKeydown(e) {
    e.preventDefault();
    let selectedOption = document.activeElement;
    selectedOption.ariaSelected = true;
    
    if (e.key === 'Escape') closeSelect();
    else if (select == selectedOption &&  e.key === 'Enter') {
        const firstButton = select.querySelector('button');
        firstButton.focus();
    }
    else if (e.key === 'ArrowUp' || e.key ==='ArrowDown' || e.key === 'Home' || e.key === 'End') {
        selectedOption.ariaSelected = false;
        
        if (e.key === 'ArrowUp') {
            selectedOption = (selectedOption.previousElementSibling != null)
            ?   selectedOption.previousElementSibling
            :   selectedOption.parentNode.lastElementChild;
        } else if (e.key === 'ArrowDown') {
            selectedOption = ( selectedOption.nextElementSibling != null )
            ?   selectedOption.nextElementSibling
            :   selectedOption.parentNode.firstElementChild;
        } else {
            selectedOption = (e.key === 'Home')
            ?   selectedOption.parentNode.firstElementChild
            :   selectedOption.parentNode.lastElementChild;
        }

        selectedOption.ariaSelected = true;
        selectedOption.focus();
    }
    else if (e.key === 'Enter') handleOption(e);
    
}
/**
 * Update the current element for the select drop-down
 * @param {element} option option selected in drop-down
 */
function updateCurrentOption(option) {
    currentOption.setAttribute('data-value', option.value);
    currentOption.textContent = option.innerText;
}
/**
 *  Updates the drop-down list and the gallery of photographers according to the option chosen, then closes the drop-down list.
 * @param {element} option element in a drop-down list
 */
function handleOption(e) {
    const option = e.target,
    value = option.getAttribute("data-value");
    e.stopPropagation();

    if (value != currentOption.getAttribute("data-value")) {
        select.insertBefore(option, select.firstElementChild);
        updateCurrentOption(option);
        updateGalery(value);
    }
    closeSelect();
}

/**###########################  EXPORT  ###########################**/
/**
 * Updates the behavior of the dropdown
 */
export function updateSelect() {
    //label.addEventListener('click', () => select.focus());
    currentOption.addEventListener('click', openSelect);
    select.addEventListener('keydown', e => {
        if (e.key === 'Enter' && document.activeElement === select) {
            e.stopPropagation();
            openSelect();
        }
    }, true);
    
    for (const option of select.children) {
        option.addEventListener('click', handleOption)
    }
}

