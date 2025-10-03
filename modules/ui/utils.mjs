const INIT_UTILS = function () {
  const copyBtn = document.querySelector('.copy-btn');
  const textToCopy = document.querySelector('code');
  const copyrightEl = document.querySelector('.copyright');

  const copyrightYear = function () {
    const year = new Date().getFullYear();
    copyrightEl.innerHTML = `© ${year} arrayIpsum`;
  };

  copyrightYear();

  const writeClipboardText = async function (code) {
    try {
      await navigator.clipboard.writeText(code);
      console.log('copied', code);
    } catch (error) {
      console.error(error.message);
    }
  };

  //   console.log(textToCopy.textContent);

  copyBtn.addEventListener('click', () =>
    writeClipboardText(textToCopy.textContent)
  );
};

export { INIT_UTILS };
