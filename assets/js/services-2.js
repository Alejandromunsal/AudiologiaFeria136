document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.services-2-swiper', {
    loop: false,
    speed: 600,
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.services-2-swipe.right',
      prevEl: '.services-2-swipe.left'
    },
    pagination: {
      el: '.services-2-bullets',
      type: 'bullets',
      clickable: true,
      renderBullet: function (index, className) {
        // Para escritorio limitamos bullets a los necesarios
        if (window.innerWidth >= 1200 && index >= 3) return '';
        return `<span class="${className}"></span>`;
      }
    },
    breakpoints: {
      0: { slidesPerView: 1, slidesPerGroup: 1 },
      768: { slidesPerView: 2, slidesPerGroup: 1 },
      1200: { slidesPerView: 3, slidesPerGroup: 1 }
    }
  });

  // ==========================
  // Autoplay manual “hover”
  // ==========================
  const autoplayDelay = 4000; // 4 segundos
  let autoplayInterval = null;

  const startAutoplay = () => {
    stopAutoplay(); // limpiar por si acaso
    autoplayInterval = setInterval(() => {
      const totalSlides = swiper.slides.length;
      const slidesPerView = swiper.params.slidesPerView;

      if (swiper.activeIndex >= totalSlides - slidesPerView) {
        swiper.slideTo(0); // volver al inicio
      } else {
        swiper.slideNext();
      }
    }, autoplayDelay);
  };

  const stopAutoplay = () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
  };

  // Iniciar autoplay al cargar
  startAutoplay();

  // Pausar/reanudar al pasar ratón sobre slides
  swiper.slides.forEach(slide => {
    slide.addEventListener('mouseenter', stopAutoplay);
    slide.addEventListener('mouseleave', startAutoplay);
  });

  // Pausar/reanudar al pasar ratón sobre flechas o bullets
  document.querySelectorAll('.services-2-swipe, .services-2-bullets').forEach(el => {
    el.addEventListener('mouseenter', stopAutoplay);
    el.addEventListener('mouseleave', startAutoplay);
  });
});
