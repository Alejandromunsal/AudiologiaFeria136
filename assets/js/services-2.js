document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.services-2-swiper', {
    loop: false, // Para controlar bullets exactos
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
        // Escritorio: solo 3 bullets
        if (window.innerWidth >= 1200) {
          if (index >= 3) return '';
        }
        return `<span class="${className}"></span>`;
      }
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1, // 1 bullet por slide
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 1, // 1 bullet por slide
      },
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 1, // bullets personalizados
      }
    }
  });

  // Autoplay manual con loop visual
  const autoplayDelay = 4000;
  setInterval(() => {
    let activeIndex = swiper.activeIndex;
    let slidesPerView = swiper.params.slidesPerView;
    let totalSlides = swiper.slides.length;

    if (window.innerWidth >= 1200) {
      // Escritorio: reinicia al final de las 3 bullets
      if (activeIndex >= totalSlides - slidesPerView) {
        swiper.slideTo(0);
      } else {
        swiper.slideNext();
      }
    } else {
      // Móvil/Tablet: avanza normalmente
      if (activeIndex >= totalSlides - 1) {
        swiper.slideTo(0);
      } else {
        swiper.slideNext();
      }
    }
  }, autoplayDelay);
});
