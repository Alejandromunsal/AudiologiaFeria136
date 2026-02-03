document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('.gamas .nav-link');
  const tabContent = document.getElementById('gamas-content-id');

  const isMobile = () => window.innerWidth < 992;

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!isMobile()) return;

      setTimeout(() => {
        const headerOffset = 140; // ⬅️ cambia a 80 si tienes header fijo
        const elementPosition = tabContent.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 200);
    });
  });
});
