document.addEventListener('DOMContentLoaded', function () {
  var data = window.pubData || {};
  var activePanel = null;
  var activeKey = null;
  var activeType = null;

  document.querySelectorAll('.pub-toggle').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var key = this.dataset.key;
      var type = this.dataset.type;

      if (activePanel) {
        activePanel.remove();
        document.querySelectorAll('.pub-toggle.active').forEach(function (el) {
          el.classList.remove('active');
        });
        if (activeKey === key && activeType === type) {
          activePanel = null;
          activeKey = null;
          activeType = null;
          return;
        }
      }

      var entry = data[key];
      if (!entry || !entry[type]) return;

      var panel = document.createElement('div');
      panel.className = 'pub-detail';
      panel.style.display = 'block';

      if (type === 'bib') {
        var pre = document.createElement('pre');
        pre.textContent = entry[type];
        panel.appendChild(pre);
      } else {
        var p = document.createElement('p');
        p.textContent = entry[type];
        panel.appendChild(p);
      }

      this.closest('.pub-links').insertAdjacentElement('afterend', panel);
      this.classList.add('active');
      activePanel = panel;
      activeKey = key;
      activeType = type;
    });
  });
});
