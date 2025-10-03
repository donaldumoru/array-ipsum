/****************************************************************************
 *                                                                          *
 * ALL THE DATA TO BE USED FOR THIS APPLICATION WILL LIVE IN THIS MODULE    *
 *                                                                          *
 ***************************************************************************/

import {
  fetchRandomWords,
  randomWordsUrl,
  fetchUsers,
  userObjUrl,
} from '/modules/fetch.mjs';

/****
 *
 *
 ****/
const randomWords = await fetchRandomWords(randomWordsUrl, 10, 9);

// console.log(
//   generateRandomWords(
//     randomWords
//     /**if called with no second parameter, it defaults to lowercase*/
//   )
// );

/**
 * Fetches user objects either from sessionStorage (if it already exists)
 * or by making a network request via fetchUsers().
 * Stores the fetched data in sessionStorage for later use.
 *
 * @async
 * @function fetchUserObjects
 * @returns {Promise<Object>} A promise that resolves to the parsed user data object.
 */

const fetchUserObjects = async function (numNeeded = 100) {
  if (!sessionStorage.getItem('users')) {
    const fetchedData = await fetchUsers(userObjUrl);

    //LOGS
    console.log('data', fetchedData);
    console.log('fecthed data length', fetchedData.length);

    let stringifyData = JSON.stringify(fetchedData);
    sessionStorage.setItem('users', stringifyData);
  }

  let getUserData = sessionStorage.getItem('users');

  const storedData = JSON.parse(getUserData);

  return storedData;
};

const userData = await fetchUserObjects();

/**
 * Creates a closure around a user array and a position counter.
 *
 * Each call to the returned function provides the next `numSelected` users.
 * When the array is exhausted, it fetches a new set of users and resets
 * the position counter
 *
 * @param {User[]} arr - The initial array of user objects.
 * @returns {(numSelected: number) => Promise<User[]>}
 * async function that, when called with a number, resolves to an array
 * containing that many user objects.
 *
 */
const populateUserArray = function (arr) {
  let position = 0;

  return async function (numSelected) {
    let remaining = arr.length - position;

    if (remaining < numSelected) {
      sessionStorage.removeItem('users');

      arr = await fetchUserObjects();

      position = 0;
      console.log('fetching again');
    }

    // get the number of items user requests for by slicing array from position to position + amount requested
    // slice method---> to prevent constant mutation of the array
    const selected = arr.slice(position, position + numSelected);

    // update position to keep track of how many items have been requested from the array
    position += numSelected;

    // console.log(position, selected);

    // console.log('position:', position);
    return selected;
  };
};

export { populateUserArray, userData };
