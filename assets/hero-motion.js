(() => {
  const visual = document.querySelector('.hero-visual');
  const button = document.querySelector('.motion-toggle');
  if (!visual || !button) return;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !motionPreference.matches;
  let userChose = false;

  const update = () => {
    visual.classList.toggle('motion-enabled', playing);
    visual.classList.toggle('motion-paused', !playing);
    button.textContent = playing ? 'Pause animation' : 'Play animation';
    button.setAttribute('aria-pressed', String(playing));
    button.hidden = false;
  };

  button.addEventListener('click', () => {
    userChose = true;
    playing = !playing;
    update();
  });
  motionPreference.addEventListener('change', () => {
    if (!userChose) {
      playing = !motionPreference.matches;
      update();
    }
  });

  update();
})();
