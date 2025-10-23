/****************************************************************************
 *                                                                          *
 * ALL THE DATA TO BE USED FOR THIS APPLICATION WILL LIVE IN THIS MODULE    *
 *                                                                          *
 ***************************************************************************/

import {
  fetchRandomWords,
  fetchUsers,
  fetchProducts,
  randomWordsUrl,
  userObjUrl,
  productsUrl,
} from '/modules/fetch.mjs';

const renderWords = async function (numWords, length) {
  const randomWords = await fetchRandomWords(randomWordsUrl, numWords, length);
  return randomWords;
};

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

    let stringifyData = JSON.stringify(fetchedData);
    sessionStorage.setItem('users', stringifyData);
  }

  let getUserData = sessionStorage.getItem('users');

  const storedData = JSON.parse(getUserData);

  return storedData;
};

const userDataResponse = await fetchUserObjects();

const userData = userDataResponse.results;

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

////// NEED TO FIX THE CALLS TO THIS TO BE WRAPPED IN A CLOSURE
const populateUserArray = function (arr) {
  let position = 0;

  return async function (numSelected) {
    let remaining = arr.length - position;

    if (remaining < numSelected) {
      sessionStorage.removeItem('users');

      arr = await fetchUserObjects();

      position = 0;
    }

    // get the number of items user requests for by slicing array from position to position + amount requested
    // slice method---> to prevent constant mutation of the array
    const selected = arr.slice(position, position + numSelected);

    // update position to keep track of how many items have been requested from the array
    position += numSelected;

    return selected;
  };
};

const productsData = await fetchProducts(productsUrl);

/**
 * Creates a closure around a product array and maintains a position counter.
 *
 * Each call to the returned function returns the next number of selected items from the array
 * When the end of the array is reached and there's nott enough items left,
 * it wraps around to the beginning to fulfill the request
 *
 * @param {Object[]} arr - The array of product objects to iterate through.
 * @returns {(numSelected: number) => Object[]} A function that, when called with
 * the number of items to select, returns that many products and loops back to the start if necessary.
 *
 */
const populateProductsArray = function (arr) {
  let position = 0;

  return function (numSelected) {
    if (
      position < productsData.length &&
      productsData.length - position >= numSelected
    ) {
      const selected = arr.slice(position, position + numSelected);
      position += numSelected;

      return selected;
    } else if (productsData.length - position < numSelected) {
      const itemsRemainingInArr = arr.slice(position, arr.length);
      position = 0;
      const numItemsStillNeeded = numSelected - itemsRemainingInArr.length;
      const addedFromBeginning = arr.slice(position, numItemsStillNeeded);
      const selected = [...itemsRemainingInArr, ...addedFromBeginning];

      return selected;
    }
  };
};

export {
  renderWords,
  populateUserArray,
  userData,
  populateProductsArray,
  productsData,
};
