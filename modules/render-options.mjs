import { selectTypeToGenerate } from '../modules/ui/generate-array.mjs';

const radioContainer = document.querySelector('.radio2');
const button = document.querySelector('.generate-btn');

const renderOptions = async function (e) {
  const optionsContainer = document.querySelectorAll('.option-container ');

  if (e.target.matches('input[type="radio"]')) {
    optionsContainer.forEach(option => {
      if (option.dataset.identifier === e.target.dataset.identifier) {
        option.classList.remove('hide');
      } else {
        option.classList.add('hide');
      }
    });

    // selectTypeToGenerate(e, e.target.dataset.identifier);

    button.setAttribute('data-identifier', e.target.dataset.identifier);
  }
};

radioContainer.addEventListener('change', renderOptions);

export { renderOptions };

// const options = {
//   words: {
//     numOfWords: {
//       type: 'number',
//       minlength: 1,
//       maxlength: 100,
//     },
//     lengthOfWord: {
//       type: 'number',
//       minlength: 3,
//       maxlength: 9,
//     },
//     textTransform: {
//       lowercase: 'lowercase',
//       uppercase: 'uppercase',
//       capitalize: 'capitalize',
//     },
//   },

//   emails: {
//     numOfEmails: {
//       type: 'number',
//       minlength: 1,
//       maxlength: 100,
//     },
//   },

//   usernames: {
//     numofUsernames: {
//       type: 'number',
//       minlength: 1,
//       maxlength: 100,
//     },
//   },

//   integers: {
//     numOfIntegers: {
//       type: 'number',
//       minNumber: 1,
//       maxNumber: 100,
//       //between min and max ----> Range
//     },
//   },

//   objects: {
//     //users or products
//   },
// };
