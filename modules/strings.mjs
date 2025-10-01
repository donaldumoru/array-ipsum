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

// FETCH SHOULD BE DONE ONCE... MAYBE 100... WHEN ARRAY SIZE IS DOWN TO MAYBE 20, WE FETCH AGAIN
const generateEmailAddresses = function (arr, numUsers) {
  return arr;
};

export { generateRandomWords };
