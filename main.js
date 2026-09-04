/* VocalFlow — comportements de la landing (port du script de la maquette Claude Design).
   Veil d'ouverture, halo qui suit la souris, compteurs animés, widget de démo, accordéon FAQ,
   lien Calendly centralisé. Aucun style inline n'est écrit via setAttribute (CSP style-src 'self'). */
(function () {
  'use strict';

  /* ---- Réglages ---- */
  var CALENDLY_URL = 'https://calendly.com/contact-vocal-flow/audit-ia-vocale';
  /* Widget de démo (S4) : si true, le cadre s'agrandit à la hauteur complète dès que l'appel démarre
     (détecté par le focus donné à l'iframe). Maquette : false, le bouton reste cadré. Hauteurs : voir styles.css (--widget-*). */
  var WIDGET_AUTO_EXPAND = false;
  var STATS_DURATION = 1600;

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---- Lien de réservation (source unique de vérité) ----
     Les <a data-calendly> ont déjà l'URL en dur dans le HTML (fonctionne sans JS). */
  qsa('a[data-calendly]').forEach(function (a) { a.setAttribute('href', CALENDLY_URL); });

  /* ---- Veil d'ouverture : retiré du DOM une fois le fondu terminé (maquette : 2,1 s). Garde-fou 4 s.
     Un calque fixe plein écran, même invisible, peut intercepter les taps sur iOS. ---- */
  var veil = qs('.veil');
  if (veil) {
    var removeVeil = function () { if (veil.parentNode) veil.parentNode.removeChild(veil); };
    if (getComputedStyle(veil).animationName === 'none' || getComputedStyle(veil).display === 'none') {
      removeVeil();
    } else {
      veil.addEventListener('animationend', function (event) { if (event.target === veil) removeVeil(); });
      setTimeout(removeVeil, 4000);
    }
  }

  /* ---- Entrées animées : une fois jouées, on retire l'animation (classe .is-in) ---- */
  qsa('.rise, .nav-wrap, .widget').forEach(function (el) {
    el.addEventListener('animationend', function onEnd(event) {
      if (event.target !== el) return;
      el.classList.add('is-in');
      el.removeEventListener('animationend', onEnd);
    });
  });

  /* ---- Halo qui suit la souris (pointeurs fins uniquement, interpolation 0,12 comme la maquette) ---- */
  var spot = qs('.spot');
  if (spot && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    var tx = -1000, ty = -1000, x = tx, y = ty, raf = 0;
    var tick = function () {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      spot.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    window.addEventListener('mousemove', function (event) {
      if (x < -500) { x = event.clientX; y = event.clientY; }
      tx = event.clientX; ty = event.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
  }

  /* ---- Compteurs (S2) : montent de 0 à la valeur cible quand la carte entre à 30 % dans l'écran ---- */
  var statsBox = qs('.stats__box');
  var counters = qsa('[data-count]');
  function formatStat(el, value) {
    return (el.getAttribute('data-prefix') || '') + value.toLocaleString('fr-FR') + (el.getAttribute('data-suffix') || '');
  }
  if (counters.length) {
    var statsRan = false;
    var runStats = function () {
      if (statsRan) return;
      statsRan = true;
      var t0 = performance.now();
      var step = function (now) {
        var p = Math.min(1, (now - t0) / STATS_DURATION);
        var e = 1 - Math.pow(1 - p, 3);
        counters.forEach(function (el) {
          var target = parseInt(el.getAttribute('data-count'), 10);
          el.textContent = formatStat(el, Math.round(target * e));
        });
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    counters.forEach(function (el) { el.textContent = formatStat(el, 0); });
    if ('IntersectionObserver' in window && statsBox) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runStats(); io.disconnect(); }
        });
      }, { threshold: 0.3 });
      io.observe(statsBox);
    } else {
      runStats();
    }
  }

  /* ---- Démo en direct (S4) : le clic révèle le widget et charge l'iframe (chargée uniquement à la demande) ---- */
  var demoIdle = qs('.demo__idle');
  var demoLive = qs('.demo__live');
  var revealBtn = qs('.demo__reveal');
  var widgetFrame = qs('.widget__frame');
  var widgetIframe = qs('.widget__frame iframe[data-src]');
  if (revealBtn && demoIdle && demoLive) {
    revealBtn.addEventListener('click', function () {
      demoIdle.hidden = true;
      demoLive.hidden = false;
      if (widgetIframe && !widgetIframe.getAttribute('src')) widgetIframe.setAttribute('src', widgetIframe.getAttribute('data-src'));
      /* Le bouton cliqué disparaît : on déplace le focus sur le contenu révélé (tabindex=-1, role=status annonce « En ligne »). */
      try { demoLive.focus({ preventScroll: true }); } catch (e) { demoLive.focus(); }
    });
    if (WIDGET_AUTO_EXPAND && widgetFrame && widgetIframe) {
      /* Le focus passé à l'iframe (clic sur son bouton) fait perdre le focus à la fenêtre : signal de départ d'appel. */
      window.addEventListener('blur', function () {
        setTimeout(function () {
          if (document.activeElement === widgetIframe) widgetFrame.classList.add('is-open');
        }, 0);
      });
    }
  }

  /* ---- FAQ (S11) : accordéon, un seul ouvert, aucun par défaut ; icône + / × ---- */
  var faqItems = qsa('.faq__item');
  var faqOpen = -1;
  function renderFaq() {
    faqItems.forEach(function (item, i) {
      var open = i === faqOpen;
      var btn = qs('.faq__q', item);
      var answer = qs('.faq__a', item);
      var icon = qs('.faq__icon', item);
      item.classList.toggle('is-open', open);
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (answer) answer.hidden = !open;
      if (icon) icon.textContent = open ? '×' : '+';
    });
  }
  if (faqItems.length) {
    faqItems.forEach(function (item, i) {
      var btn = qs('.faq__q', item);
      if (!btn) return;
      btn.addEventListener('click', function () {
        faqOpen = faqOpen === i ? -1 : i;
        renderFaq();
      });
    });
    renderFaq();
  }
})();
