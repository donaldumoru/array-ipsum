import {
  generateRandomWords,
  generateEmailAddressesOrUsernames,
} from '../strings.mjs';

import { fetchRandomWords, randomWordsUrl } from '../fetch.mjs';

//button
const button = document.querySelector('.generate-btn');

//random words
const wordsAmount = document.querySelector('#word-amount');
const wordLength = document.querySelector('#word-length');
const textTransformOptions = document.querySelector('.words-option');
let textTransform;

//emails
const emailsAmount = document.querySelector('#email-amount');

//usernames
const usernamesAmount = document.querySelector('#usernames-amount');

const renderWords = async function (numWords, length) {
  const randomWords = await fetchRandomWords(randomWordsUrl, numWords, length);
  return randomWords;
};

// Render default
generateRandomWords(
  await renderWords(+wordsAmount.value, 10)

  /**if called with no second parameter, it defaults to lowercase*/
);

const renderEmails = function () {};
const renderUserNames = function () {};

const selectTextTransformOption = function (e) {
  if (e.target.matches('input[type="radio"]')) {
    // console.log(e.target.nextElementSibling.textContent.trim());
    textTransform = e.target.nextElementSibling.textContent.trim();
  }
};

textTransformOptions.addEventListener('change', selectTextTransformOption);

const selectTypeToGenerate = async function (e) {
  const type = e.currentTarget.dataset.identifier;

  switch (type) {
    case 'words':
      if (!wordsAmount.value || !wordLength.value) {
        wordsAmount.value = 10;
        wordLength.value = '';
      }

      generateRandomWords(
        await renderWords(+wordsAmount.value, +wordLength.value),
        textTransform
        /**if called with no second parameter, it defaults to lowercase*/
      );
      break;
    case 'emails':
      generateEmailAddressesOrUsernames(+emailsAmount.value);
      break;
    case 'usernames':
      generateEmailAddressesOrUsernames(+usernamesAmount.value, 'username');
      break;
    default:
  }
};

button.addEventListener('click', selectTypeToGenerate);

export { renderWords, selectTypeToGenerate };
