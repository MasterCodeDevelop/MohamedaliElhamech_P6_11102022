const jsonData = await getJsonData();

/**
 *  Fetches the data photographers
 * @returns  {promise} object Json
 */
export async function getJsonData() {
    const response = await fetch('./data/photographers.json');
    return await response.json();
}
/**
 * Gets all photographerss
 * @returns {promise} array of phtographers
 */
export async function getPhotographers() {
    return jsonData.photographers
}