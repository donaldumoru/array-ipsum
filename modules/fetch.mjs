let randomWordsUrl = 'https://random-word-api.vercel.app/api?words=';
let userObjUrl = 'https://randomuser.me/api/?results=';

/**
 * Async function to fetch random words from random-word-api.vercel.app
 *
 * @param {string} url - Url to fetch from
 * @param {number} [numWords] - Number of words to generate
 * @param {number} [length = 0] - length of each word. Defaul to 0 when not passed || invalid parameter passed
 * @returns {string[]} An array of generated dummy strings.
 */
const getRandomWords = async function (
  url,
  numWords = 10,
  length = 0 /**default word length to 0*/
) {
  // Immediately exit if number of words requested is above 500 or below 0 (random-word-api criteria)
  // Sepearate check also implemented in the user interface
  if (numWords > 500 || numWords < 1) return `get out of here`;

  // check if length of words meet random-word-api criteria and set the url based
  if (length > 2 && length <= 9) {
    url = `https://random-word-api.vercel.app/api?words=${numWords}&length=${length}`;
  } else {
    url = `https://random-word-api.vercel.app/api?words=${numWords}`;
  }

  try {
    const response = await fetch(url);

    // console.log(response);

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
 * Async function to fetch random random user objects
 *
 * @param {string} url - Url to fetch from
 * @param {number} [numUsers] - Number of users to fetch
 * @returns {Object[]} An array of generated dummy user objects.
 */
const getUsers = async function (url, numUsers = 100) {
  url = url + numUsers;

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

export { getUsers, userObjUrl, getRandomWords, randomWordsUrl };
