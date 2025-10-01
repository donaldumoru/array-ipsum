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
const fetchUserObjects = async function () {
  if (!sessionStorage.getItem('users')) {
    const data = await fetchUsers(userObjUrl);

    let stringifyData = JSON.stringify(data);
    console.log('fetch', stringifyData);
    sessionStorage.setItem('users', stringifyData);
  }

  let getUserData = sessionStorage.getItem('users');
  const data = JSON.parse(getUserData);

  return data;
};

const userData = await fetchUserObjects();

/**
 * Populates a subset of user objects from 'userData'
 * If the array has fewer than or equal to 20 users, it clears
 * sessionStorage, refetches the user data, and refills the array.
 *
 * @async
 * @function populateUserArray
 * @param {Object[]} arr - The array of user objects to select from.
 * @param {number} numSelected - The number of users to select from the array.
 * @returns {Promise<Object[]>} A promise that resolves to an array of selected user objects.
 */
const populateUserArray = async function (arr, numSelected) {
  if (arr.length <= 20) {
    sessionStorage.removeItem('users');
    arr = await fetchUserObjects();
    console.log('refill', sessionStorage.getItem('users'));
  }

  const selected = arr.splice(0, numSelected);

  console.log(selected);

  return selected;
};

export { populateUserArray, userData };
