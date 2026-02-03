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
        const totalSlides = document.querySelectorAll('.services-2-swiper .swiper-slide').length;

        if (window.innerWidth >= 1200) {
          // Escritorio: bullets por grupo de 3 slides consecutivos
          const bulletsCount = totalSlides - 2; // 123, 234, 345, ...
          if (index >= bulletsCount) return ''; // Oculta bullets sobrantes
        } else {
          // Tablet/Móvil: un bullet por slide
          // No hacemos nada, todos los index son válidos
        }

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
    stopAutoplay();
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
