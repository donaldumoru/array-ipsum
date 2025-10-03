const options = {
  words: {
    numOfWords: {
      type: 'number',
      minlength: 1,
      maxlength: 100,
    },
    lengthOfWord: {
      type: 'number',
      minlength: 3,
      maxlength: 9,
    },
    textTransform: {
      lowercase: 'lowercase',
      uppercase: 'uppercase',
      capitalize: 'capitalize',
    },
  },

  emails: {
    numOfEmails: {
      type: 'number',
      minlength: 1,
      maxlength: 100,
    },
  },

  usernames: {
    numofUsernames: {
      type: 'number',
      minlength: 1,
      maxlength: 100,
    },
  },

  numbers: {
    numOfIntegers: {
      type: 'number',
      minNumber: 1,
      maxNumber: 100,
      //between min and max ----> Range
    },
  },

  objects: {
    type, //users or products
  },
};
