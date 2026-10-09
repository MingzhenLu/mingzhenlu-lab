// Minimal player: native controls are swapped for a bar BELOW the picture, so the
// burned-in captions at the bottom of the video are never covered. Without JS the
// <video> keeps its native controls.
(function () {
  function fmt(s) {
    s = Math.floor(s || 0);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  document.querySelectorAll('[data-vplayer]').forEach(function (p) {
    var v = p.querySelector('video');
    var q = function (c) { return p.querySelector(c); };
    var play = q('.vplay'), big = q('.vbig'), seek = q('.vseek'), time = q('.vtime'),
        mute = q('.vmute'), fs = q('.vfs');
    v.removeAttribute('controls');
    p.classList.add('is-ready');

    function update() {
      var pct = v.duration ? (v.currentTime / v.duration) * 100 : 0;
      time.textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration);
      seek.value = pct * 10;
      seek.style.setProperty('--p', pct + '%');
    }
    function toggle() { if (v.paused) { v.play(); } else { v.pause(); } }

    play.addEventListener('click', toggle);
    big.addEventListener('click', toggle);
    v.addEventListener('click', toggle);
    v.addEventListener('play', function () { p.classList.add('is-playing'); play.setAttribute('aria-label', 'Pause'); });
    v.addEventListener('pause', function () { p.classList.remove('is-playing'); play.setAttribute('aria-label', 'Play'); });
    ['timeupdate', 'loadedmetadata', 'durationchange'].forEach(function (e) { v.addEventListener(e, update); });
    seek.addEventListener('input', function () {
      if (v.duration) { v.currentTime = (seek.value / 1000) * v.duration; }
    });
    mute.addEventListener('click', function () {
      v.muted = !v.muted;
      p.classList.toggle('is-muted', v.muted);
      mute.setAttribute('aria-label', v.muted ? 'Unmute' : 'Mute');
    });
    fs.addEventListener('click', function () {
      var el = document.fullscreenElement || document.webkitFullscreenElement;
      if (el) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
      else if (p.requestFullscreen) { p.requestFullscreen(); }
      else if (p.webkitRequestFullscreen) { p.webkitRequestFullscreen(); }
      else if (v.webkitEnterFullscreen) { v.webkitEnterFullscreen(); } // iPhone: video element only
    });
    update();
  });
})();
