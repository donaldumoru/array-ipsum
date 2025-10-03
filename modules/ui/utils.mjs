const INIT_COPY_FN = function () {
  const copyBtn = document.querySelector('.copy-btn');
  const textToCopy = document.querySelector('code');

  const writeClipboardText = async function (code) {
    try {
      await navigator.clipboard.writeText(code);
      console.log('copied', code);
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log(textToCopy.textContent);

  copyBtn.addEventListener('click', () =>
    writeClipboardText(textToCopy.textContent)
  );
};

export { INIT_COPY_FN };
