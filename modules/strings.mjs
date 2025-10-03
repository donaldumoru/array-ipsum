import { populateUserArray, userData } from './data.mjs';
const appContainer = document.querySelector('.code-display');

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
  const toRender = arr.map(str => {
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

  let text = `<pre>
  <button class = "copy-btn">copy</button>
  <code>const arrayIpsum = ${JSON.stringify(toRender)}</code>
    </pre>`;

  appContainer.innerHTML = '';

  appContainer.insertAdjacentHTML('beforeend', text);
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

const getSelected = populateUserArray(userData);

const generateEmailAddressesOrUsernames = async function (num, type = 'email') {
  const userArray = await getSelected(num);

  let toRender;

  if (type === 'email') {
    toRender = userArray.map(user => user?.email);
  } else {
    toRender = userArray.map(user => user?.login?.username);
  }

  let text = `
    <pre>
      <button class = "copy-btn">copy</button>
      <code>const arrayIpsum = ${JSON.stringify(toRender)}</code>
    </pre>`;

  appContainer.innerHTML = '';

  appContainer.insertAdjacentHTML('beforeend', text);
};

export { generateRandomWords, generateEmailAddressesOrUsernames };
