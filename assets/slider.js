/**
 * @param {string} sliderSelector - Selector CSS para los contenedores del slider
 * @param {object} options - Opciones de configuración
 * @param {string} options.trackSelector - Selector para el track (default: '.sliderTrack')
 * @param {string} options.prevBtnSelector - Selector para botón anterior (default: '.prevBtn')
 * @param {string} options.nextBtnSelector - Selector para botón siguiente (default: '.nextBtn')
 * @param {string} options.slideSelector - Selector para los slides (opcional, solo si usas spotlight)
 * @param {string} options.overlaySelector - Selector para el overlay (opcional, solo si usas spotlight)
 * @param {boolean} options.enableSpotlight - Activar efecto spotlight (default: false)
 * @param {boolean} options.enableSwipe - Activar deslizamiento táctil (default: true)
 * @param {number} options.swipeThreshold - Distancia mínima para detectar swipe en px (default: 50)
 */
function initSlider(sliderSelector, options = {}) {
  const defaults = {
    trackSelector: '.sliderTrack',
    prevBtnSelector: '.prevBtn',
    nextBtnSelector: '.nextBtn',
    slideSelector: '.slide-item',
    overlaySelector: '.slide-overlay',
    enableSpotlight: false,
    enableSwipe: true,
    swipeThreshold: 50,
    extraSteps: 0
  };

  const config = { ...defaults, ...options };

  const sliders = document.querySelectorAll(sliderSelector);

  sliders.forEach(slider => {
    const track = slider.querySelector(config.trackSelector);
    const prev = slider.querySelector(config.prevBtnSelector);
    const next = slider.querySelector(config.nextBtnSelector);

    if (!track) return;

    const slides = config.enableSpotlight 
      ? slider.querySelectorAll(config.slideSelector) 
      : null;

    let currentIndex = 0;

    // Variables para swipe
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    function getSlideWidth() {
      const firstSlide = track.children[0];
      if (!firstSlide) return 0;
      return firstSlide.offsetWidth;
    }

    function getVisibleCount() {
      const sliderWidth = slider.offsetWidth;
      const slideWidth = getSlideWidth();
      return Math.floor(sliderWidth / slideWidth);
    }

    function getMaxIndex() {
      const isMobile = window.innerWidth < 768;
      const steps = isMobile ? 0 : config.extraSteps;
      return Math.max(track.children.length - getVisibleCount() + steps, 0);
    }

    function updateSpotlight() {
      if (!config.enableSpotlight || !slides) return;
      
      const visibleCount = getVisibleCount();
      const centerIndex = currentIndex + Math.floor(visibleCount / 2);

      slides.forEach((slide, index) => {
        const overlay = slide.querySelector(config.overlaySelector);
        if (overlay) {
          overlay.style.opacity = index === centerIndex ? "0" : "1";
        }
      });
    }

    function updateSlider() {
      const slideWidth = getSlideWidth();
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      if (config.enableSpotlight) {
        updateSpotlight();
      }
    }

    function goToNext() {
      currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
      updateSlider();
    }

    function goToPrev() {
      currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
      updateSlider();
    }

    next?.addEventListener("click", goToNext);
    prev?.addEventListener("click", goToPrev);

    window.addEventListener("resize", function () {
      currentIndex = 0;
      updateSlider();
    });

    if (config.enableSwipe) {
      
      function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
      }

      function handleTouchMove(e) {
        if (!isDragging) return;
        touchEndX = e.touches[0].clientX;
      }

      function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        const swipeDistance = touchStartX - touchEndX;
        
        if (swipeDistance > config.swipeThreshold) {
          goToNext();
        }
        else if (swipeDistance < -config.swipeThreshold) {
          goToPrev();
        }
        
        touchStartX = 0;
        touchEndX = 0;
      }

      slider.addEventListener('touchstart', handleTouchStart, { passive: true });
      slider.addEventListener('touchmove', handleTouchMove, { passive: true });
      slider.addEventListener('touchend', handleTouchEnd);
    }

    if (config.enableSpotlight) {
      updateSpotlight();
    }
  });
}

window.initSlider = initSlider;