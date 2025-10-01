let randomWordsUrl = 'https://random-word-api.vercel.app/api?words=';
let userObjUrl = 'https://randomuser.me/api/?results=';

/**
 * Fetches random words from random-word-api.vercel.app
 *
 * @async
 * @param {string} url - Url to fetch from
 * @param {number} [numWords] - Number of words to generate
 * @param {number} [length = 0] - length of each word. Defaul to 0 when not passed || invalid parameter passed
 * @returns {string[]} An array of generated dummy strings.
 */
const fetchRandomWords = async function (url, numWords = 10, length = 0) {
  // Immediately exit if number of words requested is above 500 or below 0 (random-word-api criteria)
  // Sepearate check SHOULD also be implemented in the user interface
  if (numWords > 500 || numWords < 1) return;

  // check if length of words meet random-word-api criteria and set the url based on length specified
  if (length > 2 && length <= 9) {
    url = `https://random-word-api.vercel.app/api?words=${numWords}&length=${length}`;
  } else {
    url = `https://random-word-api.vercel.app/api?words=${numWords}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * fetches random random user objects from https://randomuser.me/api
 *
 * @async
 * @param {string} url - Url to fetch from
 * @param {number} [numUsers] - Number of users to fetch
 * @returns {Object[]} An array of generated dummy user objects.
 */

const fetchUsers = async function (url, numUsers = 100) {
  url = url + numUsers;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result.results;
  } catch (error) {
    console.error(error.message);
  }
};

export { fetchUsers, userObjUrl, fetchRandomWords, randomWordsUrl };
