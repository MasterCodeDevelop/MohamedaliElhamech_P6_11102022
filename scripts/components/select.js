import { updateGalery } from "./galery.js";

/**########################### CONST ###########################**/
const select = document.getElementById('select'),
optgroup = document.getElementById('optgroup'),
currentOption = document.getElementById('current-option');

/**########################### FUNCTIONS ###########################**/

/**
 * Show options group. Adds keyboard Event Listeners.
 */
function openSelect() {
    select.ariaExpanded = true;
    optgroup.style.display = "block";
    currentOption.style.display = "none";
    optgroup.firstElementChild.focus();
    
    window.addEventListener('keydown', handleKeydown, false);
}

/**
 * Hidden options group. Remove keyboard Event Listeners.
 */
function closeSelect() {
    select.ariaExpanded = false;
    optgroup.style.display = "none";
    currentOption.style.display = "block";
    window.removeEventListener('keydown', handleKeydown, false);
}

/**
 * Controls keyboard navigation of the ArrowUp, ArrowDown, Home, End, Escape, and Enter drop-down list.
 * @param {event} e event handling.
 */
function handleKeydown(e) {
    e.preventDefault();
    let selectedOption = document.activeElement;
    selectedOption.ariaSelected = true;

    if (e.key === 'ArrowUp' || e.key ==='ArrowDown' || e.key === 'Home' || e.key === 'End') {
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
    else if (e.key === 'Escape') closeSelect();
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
        optgroup.insertBefore(option, optgroup.firstElementChild);
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
    select.addEventListener('click', openSelect);
    select.addEventListener('keydown', e => {
        if (e.key === 'Enter' && document.activeElement === select) {
            e.stopPropagation();
            openSelect();
        }
    }, true);
    select.addEventListener('focusout', e  => {
        if (!select.contains(e.relatedTarget)) {
            closeSelect();
        }
    });
    for (const option of optgroup.children) {
        option.addEventListener('click', handleOption)
    }
}

