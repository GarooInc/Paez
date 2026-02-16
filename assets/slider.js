/**
 * @param {string} sliderSelector - Selector CSS para los contenedores del slider
 * @param {object} options - Opciones de configuración
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
    let hasMoved = false; // Nueva variable para detectar si hubo movimiento real

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
      const visibleCount = getVisibleCount();
      const totalSlides = track.children.length;
      
      // Cálculo corregido: el máximo índice es el total menos los visibles
      const maxIndex = Math.max(totalSlides - visibleCount, 0);
      
      // Solo aplicar extraSteps en desktop
      const isMobile = window.innerWidth < 1280;
      return isMobile ? maxIndex : maxIndex + config.extraSteps;
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
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateSlider();
    }

    function goToPrev() {
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
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
        touchEndX = e.touches[0].clientX; // Inicializar también touchEndX
        isDragging = true;
        hasMoved = false; // Reset del flag de movimiento
      }

      function handleTouchMove(e) {
        if (!isDragging) return;
        touchEndX = e.touches[0].clientX;
        
        // Detectar si hubo movimiento significativo
        const diff = Math.abs(touchStartX - touchEndX);
        if (diff > 10) { // Más de 10px se considera movimiento
          hasMoved = true;
        }
      }

      function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        // Solo procesar el swipe si hubo movimiento real
        if (!hasMoved) {
          touchStartX = 0;
          touchEndX = 0;
          return; // Salir si fue solo un tap/click
        }
        
        const swipeDistance = touchStartX - touchEndX;
        
        // Validar que la distancia supere el threshold
        if (Math.abs(swipeDistance) > config.swipeThreshold) {
          if (swipeDistance > 0) {
            // Swipe hacia la izquierda (siguiente)
            goToNext();
          } else {
            // Swipe hacia la derecha (anterior)
            goToPrev();
          }
        }
        
        // Reset de variables
        touchStartX = 0;
        touchEndX = 0;
        hasMoved = false;
      }

      // Remover passive para poder prevenir comportamiento por defecto si es necesario
      slider.addEventListener('touchstart', handleTouchStart, { passive: true });
      slider.addEventListener('touchmove', handleTouchMove, { passive: true });
      slider.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    if (config.enableSpotlight) {
      updateSpotlight();
    }
  });
}

window.initSlider = initSlider;