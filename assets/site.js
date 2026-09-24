(() => {
  const urlInput = document.querySelector('#share-url');
  const copyButton = document.querySelector('[data-copy-link]');
  const nativeButton = document.querySelector('[data-share-native]');
  const feedback = document.querySelector('.share-feedback');
  if (!urlInput || !copyButton || !nativeButton || !feedback) return;

  const url = urlInput.value;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      feedback.textContent = 'Link copied';
    } catch {
      urlInput.select();
      feedback.textContent = 'Select and copy the address above';
    }
  };

  copyButton.addEventListener('click', copy);
  nativeButton.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Yibo Wang | Researcher', url });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    await copy();
  });
})();
