/* Afnan CH guide enhancements: reading progress, byline/read-time meta, auto TOC. No external deps. */
(function () {
  var b = document.body;
  if (!b || !document.querySelector('main.wrap')) return;

  // 1. reading progress bar
  var bar = document.createElement('div');
  bar.className = 'gprogress';
  bar.setAttribute('aria-hidden', 'true');
  b.appendChild(bar);
  function onscroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? ((h.scrollTop || b.scrollTop) / max) * 100 : 0;
    bar.style.width = p + '%';
  }
  window.addEventListener('scroll', onscroll, { passive: true });
  window.addEventListener('resize', onscroll);
  onscroll();

  var main = document.querySelector('main.wrap');
  var hero = main.querySelector('.hero .hero-text') || main.querySelector('.hero');

  // 2. byline + updated date (from JSON-LD Article) + read time
  var words = (main.innerText || '').trim().split(/\s+/).length;
  var mins = Math.max(2, Math.round(words / 200));
  var date = '';
  try {
    var lds = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < lds.length && !date; i++) {
      var g = JSON.parse(lds[i].textContent);
      var arr = g['@graph'] || [g];
      for (var j = 0; j < arr.length; j++) {
        if (arr[j]['@type'] === 'Article' && arr[j].dateModified) { date = arr[j].dateModified; break; }
      }
    }
  } catch (e) {}
  if (hero) {
    var meta = document.createElement('div');
    meta.className = 'meta';
    var who = document.createElement('span');
    who.textContent = 'By Afnan CH';
    meta.appendChild(who);
    if (date) {
      var d = document.createElement('span');
      d.className = 'mdot';
      d.textContent = 'Updated ' + date;
      meta.appendChild(d);
    }
    var rt = document.createElement('span');
    rt.className = 'mdot';
    rt.textContent = mins + ' min read';
    meta.appendChild(rt);
    var tag = hero.querySelector('.tagline');
    if (tag && tag.parentNode) { tag.parentNode.insertBefore(meta, tag.nextSibling); }
    else { hero.appendChild(meta); }
  }

  // 3. table of contents from section h2s (skips the dark closing band)
  var secs = Array.prototype.slice.call(main.querySelectorAll('section')).filter(function (s) {
    var h = s.querySelector('h2');
    return h && !h.classList.contains('band-title');
  });
  if (hero && secs.length > 1) {
    var toc = document.createElement('nav');
    toc.className = 'toc';
    toc.setAttribute('aria-label', 'In this guide');
    var t = document.createElement('div');
    t.className = 'toc-title';
    t.textContent = 'In this guide';
    toc.appendChild(t);
    var ol = document.createElement('ol');
    ol.className = 'toc-list';
    secs.forEach(function (s, i) {
      var h = s.querySelector('h2');
      var id = 'sec-' + (i + 1);
      s.id = id;
      var li = document.createElement('li');
      var n = document.createElement('span');
      n.className = 'toc-n';
      n.textContent = ('0' + (i + 1)).slice(-2);
      var a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = h.textContent;
      li.appendChild(n);
      li.appendChild(a);
      ol.appendChild(li);
    });
    toc.appendChild(ol);
    hero.parentNode.insertBefore(toc, hero.nextSibling);
  }
})();
