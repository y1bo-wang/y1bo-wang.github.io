(() => {
  const button = document.querySelector('[data-share]');
  const status = document.querySelector('.share-status');
  if (!button || !status) return;

  let timer;
  const announce = (message) => {
    status.textContent = message;
    clearTimeout(timer);
    timer = setTimeout(() => { status.textContent = ''; }, 3500);
  };

  button.addEventListener('click', async () => {
    const url = location.href.split('#')[0];
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      announce('Link copied');
    } catch {
      announce('Copy this link: ' + url);
    }
  });
})();
