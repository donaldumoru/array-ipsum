const INIT_UTILS = function () {
  const copyBtn = document.querySelector('.copy-btn');
  const copyrightEl = document.querySelector('.copyright');

  const generateBtn = document.querySelector('.generate-btn');

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

  copyBtn.addEventListener('click', () => {
    const textToCopy = document.querySelector('code');
    writeClipboardText(textToCopy.textContent);
  });
};

export { INIT_UTILS };
