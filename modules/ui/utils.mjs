const INIT_UTILS = function () {
  const copyBtn = document.querySelector('.copy-btn');
  const copyrightEl = document.querySelector('.copyright');
  const toastNotification = document.querySelector('.toast-notification');

  const copyrightYear = function () {
    const year = new Date().getFullYear();
    copyrightEl.innerHTML = `© ${year} arrayIpsum`;
  };

  copyrightYear();

  const displayToastNotification = function () {
    toastNotification.classList.toggle('show-notif');
    setTimeout(() => toastNotification.classList.toggle('show-notif'), 1000);
  };

  const writeClipboardText = async function (code) {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error(error.message);
    }
  };

  copyBtn.addEventListener('click', () => {
    const textToCopy = document.querySelector('code');
    writeClipboardText(textToCopy.textContent);
    displayToastNotification();
  });
};

export { INIT_UTILS };
