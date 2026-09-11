// ============================================
// Carousel logic (works for any .carousel on the page)
// ============================================
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var prevBtn = carousel.querySelector('.carousel-btn.prev');
    var nextBtn = carousel.querySelector('.carousel-btn.next');
    var index = 0;

    function update() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      if (dotsWrap) {
        dotsWrap.querySelectorAll('span').forEach(function (dot, i) {
          dot.classList.toggle('active', i === index);
        });
      }
    }

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function () {
          index = i;
          update();
        });
        dotsWrap.appendChild(dot);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        index = (index - 1 + slides.length) % slides.length;
        update();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        index = (index + 1) % slides.length;
        update();
      });
    }

    // Auto-advance every 5 seconds
    setInterval(function () {
      index = (index + 1) % slides.length;
      update();
    }, 5000);
  });
}

// ============================================
// Accordion logic (works for top-level and nested)
// ============================================
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.nextElementSibling;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (panel) {
        panel.classList.toggle('open', !isOpen);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initCarousels();
  initAccordions();
});
