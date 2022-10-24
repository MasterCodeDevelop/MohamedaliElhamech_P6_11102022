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
            if (selectedOption.previousElementSibling != null) {
                selectedOption = selectedOption.previousElementSibling;
            } else {
                selectedOption = selectedOption.parentNode.lastElementChild;
            }
        } else if (e.key === 'ArrowDown') {
            if ( selectedOption.nextElementSibling != null ) {
                selectedOption = selectedOption.nextElementSibling;
            } else {
                selectedOption = selectedOption.parentNode.firstElementChild;
            }
        } else if (e.key === 'Home') {
            selectedOption = selectedOption.parentNode.firstElementChild;
        } else if (e.key === 'End') {
            selectedOption = selectedOption.parentNode.lastElementChild;
        }
        selectedOption.ariaSelected = true;
        selectedOption.focus();
    }
    if (e.key === 'Escape') {
        closeSelect();
    }
    if (e.key === 'Enter') {
        e.stopPropagation();
        handleOption(selectedOption);
    }
}

/**
 *  Updates the drop-down list and the gallery of photographers according to the option chosen, then closes the drop-down list.
 * @param {element} option element in a drop-down list
 */
function handleOption(option) {
    optgroup.insertBefore(option, optgroup.firstElementChild);
    currentOption.textContent = option.innerText;
    // * add function to update galery
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
        option.addEventListener('click', e => {
            e.stopPropagation();
            handleOption(option);
        }); 
    }
}

