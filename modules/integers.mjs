/**
 * Generates a random integer between min and max integer
 *
 * @param {number} min - The minimum integer
 * @param {number} max - The maximum integer
 * @returns {number} A random integer between min and max.
 */

const randomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Factory function that creates a closure around an array of numbers.
 *
 * @returns {(amount: number, min: number, max: number) => number[]}
 * A function that, when called, generates an array of random numbers.
 */
const makeArray = function () {
  const numbers = [];

  /**
   * Generates an array of random integers of the given amount,
   * within the provided range.
   *
   * @param {number} amount - How many random numbers to generate
   * @param {number} min - The minimum integer
   * @param {number} max - The maximum integer
   * @returns {number[]} An array of random integers.
   */
  return function (amount, min, max) {
    /**
     * Recursively fills the `numbers` array until `amount` reaches 0.
     *
     * @returns {void}
     */
    const fillArray = function () {
      if (amount === 0) return;

      numbers.push(randomNum(min, max));
      amount--;
      fillArray();
    };

    fillArray();

    return numbers;
  };
};

const numbersArray = makeArray();

// call this to generate numbers
// console.log(numbersArray(12, 1, 20));

export { numbersArray };
