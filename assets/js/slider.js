/**
 * Hero slider — initSlider(selector, options): autoplay, interval, dots, arrows
 */
(function () {
  'use strict';

  function initSlider(selector, options) {
    options = options || {};
    var el = document.querySelector(selector);
    if (!el) return;
    var track = el.querySelector('.hero-slider__track');
    var slides = el.querySelectorAll('.hero-slider__slide');
    var count = slides.length;
    if (!count) return;

    var interval = options.interval || 4000;
    var index = 0;
    var t;

    function goToSlide(i) {
      index = (i + count) % count;
      if (track) track.style.transform = 'translateX(-' + index * 100 + '%)';
      el.querySelectorAll('.hero-slider__dots button').forEach(function (d, j) {
        d.classList.toggle('is-active', j === index);
      });
    }

    function next() { goToSlide(index + 1); }
    function prev() { goToSlide(index - 1); }

    if (options.arrows !== false) {
      var prevBtn = el.querySelector('#hero-prev') || el.querySelector('.hero-slider__arrows button:first-of-type');
      var nextBtn = el.querySelector('#hero-next') || el.querySelector('.hero-slider__arrows button:last-of-type');
      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);
    }

    var dotsWrap = el.querySelector('.hero-slider__dots');
    if (options.dots !== false && dotsWrap && dotsWrap.children.length === 0) {
      for (var i = 0; i < count; i++) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Slide ' + (i + 1));
        btn.addEventListener('click', function (j) { return function () { goToSlide(j); }; }(i));
        dotsWrap.appendChild(btn);
      }
      goToSlide(0);
    }

    if (options.autoplay && interval > 0) {
      function start() { t = setInterval(next, interval); }
      function stop() { clearInterval(t); }
      el.addEventListener('mouseenter', stop);
      el.addEventListener('mouseleave', start);
      start();
    }

    window.heroNext = next;
    window.heroPrev = prev;
    window.heroGoToSlide = goToSlide;
  }

  window.initSlider = initSlider;
})();
