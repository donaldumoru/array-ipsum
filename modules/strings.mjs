import { populateUserArray, userData } from './data.mjs';

/**
 * generate random words
 *
 * @param {string[]} arr - array of random strings generated from func: getRandomWords
 * @param {string} [stringTransformOption = 'lowercase'] - transform option on each string.
 *      Default to lowercase if no parameter is passed
 * @returns {string[]} An array of generated dummy strings.
 */
const generateRandomWords = function (
  arr,
  stringTransformOption = 'lowercase'
) {
  return arr.map(str => {
    switch (stringTransformOption) {
      case 'lowercase':
        str = str.toLowerCase();
        break;
      case 'uppercase':
        str = str.toUpperCase();
        break;
      case 'capitalize':
        str = str.charAt(0).toUpperCase() + str.slice(1);
        break;
      default:
        break;
    }

    return str;
  });
};

/**
 * generate emails || usernames based on the type param and inserts generated
 * array as HTML into the DOM
 *
 * @param {number} - amount of strings to generate (length of the output array)
 * @param {string} [type = 'email']  - type of string to generate -> default to 'email address'
 *                                     if no parameter is passed
 * @returns {void}
 */

const body = document.querySelector('body');

const getSelected = populateUserArray(userData);

const generateEmailAddressesOrUsernames = async function (num, type = 'email') {
  const userArray = await getSelected(num);

  let toRender;

  if (type === 'email') {
    toRender = userArray.map(user => user?.email);
  } else {
    toRender = userArray.map(user => user?.login?.username);
  }

  let text = `<div>
    <pre>
      <code>${JSON.stringify(toRender)}</code>
    </pre>
  </div>`;

  body.insertAdjacentHTML('afterbegin', text);
};

// call this to generate strings
generateEmailAddressesOrUsernames(5);

export { generateRandomWords, generateEmailAddressesOrUsernames };
