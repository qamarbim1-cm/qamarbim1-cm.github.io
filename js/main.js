/* ==========================================================================
   Raja Qamar Ilyas | portfolio behaviour
   Vanilla JavaScript, no dependencies. Every feature checks that its element
   exists, so removing a section from the HTML never breaks the rest.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Contact address is assembled here so it is not sitting in the HTML for scrapers.
     Change these two values to change the address used everywhere on the page. */
  var EMAIL = { user: 'qamarilyas1', domain: 'hotmail.com' };
  var EMAIL_FULL = EMAIL.user + '@' + EMAIL.domain;

  var THEME_KEY = 'rqi-theme';

  /* ----------------------------- 1. Theme ------------------------------ */
  var themeBtn = $('#themeToggle');
  var metaTheme = $('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (metaTheme) metaTheme.setAttribute('content', theme === 'light' ? '#f4f7fb' : '#0a1220');
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', String(theme === 'light'));
      themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }
  applyTheme(root.getAttribute('data-theme') || 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode: ignore */ }
    });
  }
  // Follow the operating system until the visitor makes their own choice.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    var onSystemChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch (err) { /* ignore */ }
      if (!saved) applyTheme(e.matches ? 'light' : 'dark');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
  }

  /* --------------------------- 2. Mobile menu --------------------------- */
  var header = $('.site-header');
  var menuBtn = $('#menuToggle');
  var navLinks = $('#navLinks');

  function setMenu(open) {
    if (!header || !menuBtn) return;
    header.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!header.classList.contains('nav-open')); });
  }
  if (navLinks) {
    navLinks.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1140) setMenu(false); });

  /* ------------------ 3. Scroll effects (one throttled handler) ------------------ */
  var scrollBar = $('#scrollBar');
  var toTop = $('#toTop');
  var timelineWrap = $('#timeline');
  var tlProgress = $('#tlProgress');
  var ticking = false;

  function updateOnScroll() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle('scrolled', y > 12);
    if (scrollBar) scrollBar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    if (toTop) toTop.hidden = y < 700;

    if (timelineWrap && tlProgress) {
      var rect = timelineWrap.getBoundingClientRect();
      var start = window.innerHeight * 0.62;
      var pct = (start - rect.top) / rect.height;
      tlProgress.style.height = Math.max(0, Math.min(1, pct)) * 100 + '%';
    }
  }
  function requestTick() { if (!ticking) { ticking = true; window.requestAnimationFrame(updateOnScroll); } }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  updateOnScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ----------------- 4. Active nav link while scrolling ----------------- */
  var links = $$('.nav-links a[href^="#"]');
  if ('IntersectionObserver' in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = map[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) navObserver.observe(sec);
    });
  }

  /* ------------------------ 5. Reveal on scroll ------------------------ */
  var revealEls = $$('.reveal');
  revealEls.forEach(function (el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.setProperty('--d', d);
  });
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --------------------------- 6. Count-up numbers --------------------------- */
  var counters = $$('[data-count]');
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var t0 = null;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }
  if ('IntersectionObserver' in window && !reduceMotion && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* --------------------------- 7. Typed role line --------------------------- */
  var typed = $('#typed');
  if (typed && !reduceMotion) {
    var roles = [
      'ISO 19650 Information Management',
      'Digital Delivery',
      'Multidisciplinary BIM Coordination',
      'Asset Information Management',
      'Process Improvement and Automation'
    ];
    var ri = 0, ci = 0, deleting = false;
    var tick = function () {
      var word = roles[ri];
      ci += deleting ? -1 : 1;
      typed.textContent = word.slice(0, ci);
      var delay = deleting ? 32 : 70;
      if (!deleting && ci === word.length) { deleting = true; delay = 1700; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
      window.setTimeout(tick, delay);
    };
    typed.textContent = '';
    window.setTimeout(tick, 600);
  }

  /* ----------------------- 8. Hero pointer light ----------------------- */
  var hero = $('.hero');
  var heroBg = $('.hero-bg');
  if (hero && heroBg && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    var raf = null;
    hero.addEventListener('mousemove', function (e) {
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        heroBg.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        heroBg.style.setProperty('--my', (e.clientY - r.top) + 'px');
        raf = null;
      });
    });
  }

  /* --------------------------- 9. Contact --------------------------- */
  var emailText = $('#emailText');
  var emailReveal = $('#emailReveal');
  var emailCopy = $('#emailCopy');

  if (emailReveal && emailText) {
    emailReveal.addEventListener('click', function () {
      var a = document.createElement('a');
      a.href = 'mailto:' + EMAIL_FULL;
      a.textContent = EMAIL_FULL;
      emailText.textContent = '';
      emailText.appendChild(a);
      emailText.classList.remove('muted');
      emailReveal.hidden = true;
      if (emailCopy) emailCopy.hidden = false;
    });
  }
  if (emailCopy) {
    emailCopy.addEventListener('click', function () {
      var done = function () {
        emailCopy.setAttribute('aria-label', 'Email copied');
        window.setTimeout(function () { emailCopy.setAttribute('aria-label', 'Copy email address'); }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL_FULL).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = EMAIL_FULL; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(ta); done();
      }
    });
  }

  var form = $('#contactForm');
  var note = $('#formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var from = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();
      var ok = true;
      ['name', 'email', 'message'].forEach(function (n) { form.elements[n].classList.remove('invalid'); });
      if (!name) { form.elements.name.classList.add('invalid'); ok = false; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(from)) { form.elements.email.classList.add('invalid'); ok = false; }
      if (!message) { form.elements.message.classList.add('invalid'); ok = false; }
      if (!ok) {
        note.textContent = 'Please fill in your name, a valid email and a message.';
        note.className = 'form-note error';
        return;
      }
      var subject = 'Portfolio enquiry from ' + name;
      var body = message + '\n\nFrom: ' + name + ' <' + from + '>';
      note.textContent = 'Opening your email app. If nothing opens, use the email shown above.';
      note.className = 'form-note';
      window.location.href = 'mailto:' + EMAIL_FULL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }


  /* ----------------- 11. Project pictures: missing-file fallback + viewer ----------------- */
  // A picture that fails to load is hidden, so a visitor never sees a broken image icon.
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (!t || t.tagName !== 'IMG') return;
    var holder = t.closest('.shot, .prog-tile');
    if (holder) holder.classList.add('is-missing');
  }, true);

  var lb = $('#lightbox');
  var lbImg = $('#lbImg');
  var lbCap = $('#lbCap');
  var lbList = [];
  var lbIndex = 0;

  function collectGroup(name) {
    var list = [], seen = {};
    $$('figure.shot[data-lightbox]').forEach(function (f) {
      if (f.getAttribute('data-lightbox') !== name || f.classList.contains('is-missing')) return;
      var img = f.querySelector('img');
      if (!img) return;
      var src = img.getAttribute('src');
      if (seen[src]) return;
      seen[src] = true;
      list.push({ src: src, cap: f.getAttribute('data-caption') || '', redacted: f.classList.contains('redacted') });
    });
    return list;
  }
  function showImage(i) {
    if (!lbList.length || !lbImg) return;
    lbIndex = (i + lbList.length) % lbList.length;
    var item = lbList[lbIndex];
    lbImg.setAttribute('src', item.src);
    lbImg.setAttribute('alt', item.cap);
    lbImg.classList.toggle('is-redacted', item.redacted);
    if (lbCap) lbCap.textContent = item.cap + (lbList.length > 1 ? '  (' + (lbIndex + 1) + ' of ' + lbList.length + ')' : '');
  }
  function openViewer(fig) {
    if (!lb || !fig) return;
    var img = fig.querySelector('img');
    lbList = collectGroup(fig.getAttribute('data-lightbox'));
    if (!lbList.length || !img) return;
    var src = img.getAttribute('src'), start = 0;
    lbList.forEach(function (it, n) { if (it.src === src) start = n; });
    showImage(start);
    if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
  }
  document.addEventListener('click', function (e) {
    var fig = e.target && e.target.closest ? e.target.closest('figure.shot[data-lightbox]') : null;
    if (fig) openViewer(fig);
  });
  document.addEventListener('keydown', function (e) {
    var fig = e.target && e.target.closest ? e.target.closest('figure.shot[data-lightbox]') : null;
    if (fig && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openViewer(fig); }
    if (lb && lb.hasAttribute('open')) {
      if (e.key === 'ArrowRight') showImage(lbIndex + 1);
      if (e.key === 'ArrowLeft') showImage(lbIndex - 1);
    }
  });
  var lbClose = $('#lbClose'), lbPrev = $('#lbPrev'), lbNext = $('#lbNext');
  if (lbClose) lbClose.addEventListener('click', function () { if (lb.close) lb.close(); else lb.removeAttribute('open'); });
  if (lbPrev) lbPrev.addEventListener('click', function () { showImage(lbIndex - 1); });
  if (lbNext) lbNext.addEventListener('click', function () { showImage(lbIndex + 1); });
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb && lb.close) lb.close(); });

  /* ----------------------------- 10. Footer year ----------------------------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
