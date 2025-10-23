/**
 * render the results on the page
 *
 * @param {result[]} arr - array of results to be rendered on the page
 * @param {container} htmlElement - the container that will house the results
 *
 * @returns {void}
 */

const renderResult = function (result, container) {
  let text = `
    <pre>
      <code>const arrayIpsum = ${JSON.stringify(result)}</code>
    </pre>`;

  container.innerHTML = '';

  container.insertAdjacentHTML('beforeend', text);
};

export { renderResult };
