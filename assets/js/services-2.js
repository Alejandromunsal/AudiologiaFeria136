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
        const totalSlides = document.querySelectorAll(
          '.services-2-swiper .swiper-slide'
        ).length;

        if (window.innerWidth >= 1200) {
          const bulletsCount = totalSlides - 2;
          if (index >= bulletsCount) return '';
        }

        return `<span class="${className}"></span>`;
      }
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });

  // ==========================
  // Autoplay manual
  // ==========================
  const AUTOPLAY_DELAY = 4000;
  let autoplayInterval = null;

  const startAutoplay = () => {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      const totalSlides = swiper.slides.length;
      const slidesPerView = swiper.params.slidesPerView;

      if (swiper.activeIndex >= totalSlides - slidesPerView) {
        swiper.slideTo(0);
      } else {
        swiper.slideNext();
      }
    }, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  };

  startAutoplay();

  // ==========================
  // Pausa por interacción
  // ==========================

  // Desktop (hover)
  swiper.el.addEventListener('mouseenter', stopAutoplay);
  swiper.el.addEventListener('mouseleave', startAutoplay);

  // Mobile / touch (lo mejor)
  swiper.on('touchStart', stopAutoplay);
  swiper.on('touchEnd', startAutoplay);
});
