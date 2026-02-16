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
    extraSteps: 0,
    infinite: true, // Comportamiento tipo Slick
    edgeFriction: 0.15 // Resistencia en los bordes (como Slick)
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
    let touchStartY = 0;
    let touchCurrentX = 0;
    let isDragging = false;
    let startTransform = 0;
    let isScrolling = null;

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
      const maxIndex = Math.max(totalSlides - visibleCount, 0);
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

    function updateSlider(animate = true) {
      const slideWidth = getSlideWidth();
      
      if (animate) {
        track.style.transition = 'transform 0.3s ease-out';
      } else {
        track.style.transition = 'none';
      }
      
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      if (config.enableSpotlight) {
        updateSpotlight();
      }
    }

    function goToNext() {
      const maxIndex = getMaxIndex();
      if (config.infinite) {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      } else {
        if (currentIndex < maxIndex) {
          currentIndex++;
        }
      }
      updateSlider();
    }

    function goToPrev() {
      const maxIndex = getMaxIndex();
      if (config.infinite) {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      } else {
        if (currentIndex > 0) {
          currentIndex--;
        }
      }
      updateSlider();
    }

    next?.addEventListener("click", goToNext);
    prev?.addEventListener("click", goToPrev);

    window.addEventListener("resize", function () {
      currentIndex = 0;
      updateSlider(false);
    });

    if (config.enableSwipe) {
      
      function handleTouchStart(e) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchCurrentX = touch.clientX;
        isDragging = false;
        isScrolling = null;
        
        const slideWidth = getSlideWidth();
        startTransform = currentIndex * slideWidth;
        
        // Remover transición para drag fluido
        track.style.transition = 'none';
      }

      function handleTouchMove(e) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        
        // Determinar si es scroll vertical u horizontal
        if (isScrolling === null) {
          isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
        }
        
        // Si es scroll vertical, no interferir
        if (isScrolling) {
          return;
        }
        
        // Prevenir scroll vertical si estamos haciendo swipe horizontal
        e.preventDefault();
        
        isDragging = true;
        touchCurrentX = touch.clientX;
        
        const maxIndex = getMaxIndex();
        const slideWidth = getSlideWidth();
        let dragDistance = deltaX;
        
        // Aplicar resistencia en los bordes (efecto Slick)
        if (!config.infinite) {
          if (currentIndex === 0 && deltaX > 0) {
            // Resistencia al arrastrar hacia la derecha en el primer slide
            dragDistance = deltaX * config.edgeFriction;
          } else if (currentIndex === maxIndex && deltaX < 0) {
            // Resistencia al arrastrar hacia la izquierda en el último slide
            dragDistance = deltaX * config.edgeFriction;
          }
        }
        
        const newTransform = -startTransform + dragDistance;
        track.style.transform = `translateX(${newTransform}px)`;
      }

      function handleTouchEnd(e) {
        if (isScrolling) {
          return;
        }
        
        if (!isDragging) {
          return;
        }
        
        const deltaX = touchCurrentX - touchStartX;
        const slideWidth = getSlideWidth();
        const maxIndex = getMaxIndex();
        
        // Calcular si el swipe fue suficiente
        const swipeThreshold = config.swipeThreshold;
        const velocity = Math.abs(deltaX);
        
        // Restaurar transición
        track.style.transition = 'transform 0.3s ease-out';
        
        if (Math.abs(deltaX) > swipeThreshold) {
          if (deltaX > 0) {
            // Swipe derecha (anterior)
            if (!config.infinite && currentIndex === 0) {
              // Ya estamos en el inicio, volver a la posición
              updateSlider();
            } else {
              goToPrev();
            }
          } else {
            // Swipe izquierda (siguiente)
            if (!config.infinite && currentIndex === maxIndex) {
              // Ya estamos en el final, volver a la posición
              updateSlider();
            } else {
              goToNext();
            }
          }
        } else {
          // Swipe muy corto, volver a la posición actual
          updateSlider();
        }
        
        // Reset
        isDragging = false;
        isScrolling = null;
      }

      // Eventos touch
      slider.addEventListener('touchstart', handleTouchStart, { passive: true });
      slider.addEventListener('touchmove', handleTouchMove, { passive: false }); // passive: false para poder usar preventDefault
      slider.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Prevenir click accidental después de drag
      slider.addEventListener('click', function(e) {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    }

    if (config.enableSpotlight) {
      updateSpotlight();
    }
  });
}

window.initSlider = initSlider;