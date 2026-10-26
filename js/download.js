(() => {
  const card = document.querySelector('.star-ask');
  const starLink = document.getElementById('star-link');
  const title = document.getElementById('star-ask-title');

  function thankForSupport(event) {
    if (event.defaultPrevented || event.altKey || event.button > 1) return;
    title.textContent = 'Thanks for the support!';
    card.querySelector('.star-ask-text').hidden = true;
    starLink.hidden = true;
    title.focus({ preventScroll: true });
    // The ordinary link opens GitHub. No star checks, storage, analytics, or tracking calls.
  }

  starLink.addEventListener('click', thankForSupport);
  starLink.addEventListener('auxclick', thankForSupport);

  const platform = document.body.dataset.downloadPlatform;
  const label = platform === 'mac' ? 'macOS' : 'Windows';
  const manualLink = document.getElementById('manual-release-link');
  const status = document.getElementById('download-status');
  const latestReleaseApi = 'https://api.github.com/repos/DuetDisplay/AutoDoc/releases/latest';

  function showFallback() {
    status.textContent = `Your download couldn't start automatically. Open the latest release and choose the ${label} installer.`;
  }

  fetch(latestReleaseApi, {
    headers: { Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(10000)
  })
    .then((response) => {
      if (!response.ok) throw new Error('Latest release is not publicly available.');
      return response.json();
    })
    .then((release) => {
      const assets = Array.isArray(release.assets) ? release.assets : [];
      const pattern = platform === 'mac' ? /\.dmg$/i : /-setup\.exe$/i;
      const installer = assets.find((asset) => (
        typeof asset.name === 'string' && pattern.test(asset.name) &&
        typeof asset.browser_download_url === 'string' &&
        asset.browser_download_url.startsWith('https://github.com/DuetDisplay/AutoDoc/releases/download/')
      ));
      if (!installer) { showFallback(); return; }

      manualLink.href = installer.browser_download_url;
      manualLink.textContent = `Download for ${label}`;
      manualLink.classList.add('btn-download');
      manualLink.removeAttribute('target');
      manualLink.setAttribute('download', '');
      status.textContent = `Your download should start shortly. If it doesn't, use Download for ${label} below.`;
      // GitHub serves release assets as attachments, keeping these instructions on screen.
      manualLink.click();
    })
    .catch(showFallback);
})();
