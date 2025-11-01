/**
 * render the results on the page
 *
 * @param {result[]} arr - array of results to be rendered on the page
 * @param {container} htmlElement - the container that will house the results
 *
 * @returns {void}
 */

const codeBlock = document.querySelector('code');
const preContainer = document.querySelector('pre');

const renderResult = function (result, container) {
  codeBlock.textContent = `const arrayIpsum = ${JSON.stringify(
    result,
    null,
    2
  )}`;

  preContainer.append(codeBlock);
  container.append(preContainer);
  Prism.highlightElement(codeBlock);
};

export { renderResult };
