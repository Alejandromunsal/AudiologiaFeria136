document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.services-2-items-container');
  const items = Array.from(container.querySelectorAll('.service-item-wrapper'));
  const leftArrow = document.querySelector('.services-2-swipe.left');
  const rightArrow = document.querySelector('.services-2-swipe.right');
  const bulletsContainer = document.querySelector('.services-2-bullets');

  let currentIndex = 0;
  let bullets = [];

  const desktopGroups = [
    [0,1,2],
    [1,2,3],
    [2,3,4]
  ];

  function getGroups() {
    if(window.innerWidth >= 1200) return desktopGroups;
    return items.map((_, i) => [i]);
  }

  function createBullets() {
    bulletsContainer.innerHTML = '';
    bullets = [];
    const groups = getGroups();
    groups.forEach((_, i) => {
      const btn = document.createElement('button');
      if(i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      bulletsContainer.appendChild(btn);
      bullets.push(btn);
    });
  }

  // Función de scroll suave tipo “Apple”
  function smoothScroll(targetPos) {
    let start = container.scrollLeft;
    let distance = targetPos - start;
    let duration = 600; // duración en ms
    let startTime = null;

    function animation(currentTime) {
      if(!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Función de easing cubic (easeInOutCubic)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      container.scrollLeft = start + distance * ease;

      if(timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  }

  function updateCarousel() {
    const groups = getGroups();
    const activeGroup = groups[currentIndex];

    // Reset all items
    items.forEach(item => item.classList.remove('active'));

    // Activar solo los del grupo
    activeGroup.forEach(idx => items[idx].classList.add('active'));

    // Scroll al centro del grupo
    const firstItem = items[activeGroup[0]];
    const lastItem = items[activeGroup[activeGroup.length-1]];
    const containerWidth = container.offsetWidth;
    const scrollLeft = (firstItem.offsetLeft + lastItem.offsetLeft + lastItem.offsetWidth)/2 - containerWidth/2;

    smoothScroll(scrollLeft);

    // Actualizar bullets
    bullets.forEach((b, i) => b.classList.toggle('active', i === currentIndex));
  }

  function nextSlide() {
    const groups = getGroups();
    currentIndex = (currentIndex + 1) % groups.length;
    updateCarousel();
  }

  function prevSlide() {
    const groups = getGroups();
    currentIndex = (currentIndex - 1 + groups.length) % groups.length;
    updateCarousel();
  }

  // Flechas
  leftArrow.addEventListener('click', prevSlide);
  rightArrow.addEventListener('click', nextSlide);

  // Swipe táctil
  let startX = 0;
  container.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  container.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if(diff > 40) nextSlide();
    if(diff < -40) prevSlide();
  });

  // Init
  function init() {
    currentIndex = 0;
    createBullets();
    updateCarousel();
  }

  window.addEventListener('resize', init);
  init();
});
