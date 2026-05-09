(function () {
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  const imgs = Array.from(grid.querySelectorAll('img'));
  if (!imgs.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lb-overlay';
  overlay.innerHTML = `
    <button class="lb-close" aria-label="Close">×</button>
    <button class="lb-prev" aria-label="Previous">‹</button>
    <div class="lb-stage">
      <img class="lb-img" alt="">
      <div class="lb-caption"></div>
    </div>
    <button class="lb-next" aria-label="Next">›</button>
  `;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lb-img');
  const lbCaption = overlay.querySelector('.lb-caption');
  let idx = 0;

  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[idx].src;
    const cap = imgs[idx].alt || '';
    lbCaption.textContent = cap;
    lbCaption.style.display = cap ? 'block' : 'none';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  imgs.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => show(i));
  });
  overlay.querySelector('.lb-close').addEventListener('click', close);
  overlay.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); show(idx - 1); });
  overlay.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); show(idx + 1); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
