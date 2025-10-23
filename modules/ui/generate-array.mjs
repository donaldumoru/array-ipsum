import {
  generateRandomWords,
  generateEmailAddressesOrUsernames,
} from '../strings.mjs';
import { renderWords } from '../data.mjs';
import { generateObjects } from '../objects.mjs';
import { generateRandomNumbers } from '../integers.mjs';

//button
const button = document.querySelector('.generate-btn');

//random words
const wordsAmount = document.querySelector('#word-amount');
const wordLength = document.querySelector('#word-length');
const textTransformOptions = document.querySelector('.words-option');
const objectOptions = document.querySelector('.objects-option');

let selectedOption;

//emails
const emailsAmount = document.querySelector('#email-amount');
//usernames
const usernamesAmount = document.querySelector('#usernames-amount');
//objects
const objectsAmount = document.querySelector('#objects-amount');
//numbers
const numbersAmount = document.querySelector('#numbers-amount');
const numbersMinimum = document.querySelector('#numbers-min');
const numbersMaximum = document.querySelector('#numbers-max');

// Render default
generateRandomWords(
  await renderWords(+wordsAmount.value, 10)
  /**if called with no second parameter, it defaults to lowercase*/
);

const selectTextTransformOption = function (e) {
  if (e.target.matches('input[type="radio"]')) {
    selectedOption = e.target.nextElementSibling.textContent.trim();
  }
};
textTransformOptions.addEventListener('change', selectTextTransformOption);

const selectObjectsOption = function (e) {
  if (e.target.matches('input[type="radio"]')) {
    selectedOption = e.target.nextElementSibling.textContent.trim();
  }
};

objectOptions.addEventListener('change', selectObjectsOption);

const selectTypeToGenerate = async function (e) {
  const type = e.currentTarget.dataset.identifier;

  switch (type) {
    case 'words':
      if (!wordsAmount.value) {
        wordsAmount.value = 10;
      }

      if (!wordLength.value) {
        wordLength.value = '';
      }

      generateRandomWords(
        await renderWords(+wordsAmount.value, +wordLength.value),
        selectedOption
        /**if called with no second parameter, it defaults to lowercase*/
      );
      break;
    case 'emails':
      generateEmailAddressesOrUsernames(+emailsAmount.value);
      break;
    case 'usernames':
      generateEmailAddressesOrUsernames(+usernamesAmount.value, 'username');
      break;

    case 'objects':
      generateObjects(+objectsAmount.value, selectedOption);
      break;

    case 'numbers':
      generateRandomNumbers(
        +numbersAmount.value,
        +numbersMinimum.value,
        +numbersMaximum.value
      );
      break;
    default:
  }
};

button.addEventListener('click', selectTypeToGenerate);

export { renderWords, selectTypeToGenerate };
