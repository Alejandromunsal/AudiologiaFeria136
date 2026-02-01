document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector("#precios .pricing-table-wrapper");
  const table = document.querySelector("#precios .pricing-table");
  const preciosCard = document.querySelector("#precios .precios-card");
  const leftArrow = document.querySelector("#precios .precio-swipe.left");
  const rightArrow = document.querySelector("#precios .precio-swipe.right");

  if (!wrapper || !table || !preciosCard || !leftArrow || !rightArrow) return;

  const rows = table.querySelectorAll("tr");

  // =========================
  // Desktop: hover columnas
  // =========================
  function setActiveColumn(index) {
    rows.forEach(row => {
      Array.from(row.children).forEach(cell => cell.classList.remove("active"));
    });
    rows.forEach(row => {
      const cell = row.children[index];
      if (cell) cell.classList.add("active");
    });
  }

  function initDesktopHover() {
    if (window.innerWidth >= 1200) {
      rows.forEach(row => {
        Array.from(row.children).slice(1).forEach((cell, i) => {
          cell.addEventListener("mouseenter", () => {
            setActiveColumn(i + 1);
          });
        });
      });

      table.addEventListener("mouseleave", () => setActiveColumn(1));
      setActiveColumn(1);
    } else {
      // Quita clases active al cambiar a tablet/móvil
      rows.forEach(row => {
        Array.from(row.children).forEach(cell => cell.classList.remove("active"));
      });
    }
  }

  initDesktopHover();
  window.addEventListener("resize", initDesktopHover);

  // =========================
  // Tablet / móvil: flechas scroll
  // =========================
  function updateArrows() {
    const scrollLeft = wrapper.scrollLeft;
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

    leftArrow.style.display = scrollLeft > 0 ? "block" : "none";
    rightArrow.style.display = scrollLeft >= maxScroll - 1 ? "none" : "block";
  }

  updateArrows();

  wrapper.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);

  leftArrow.addEventListener("click", () => {
    wrapper.scrollBy({ left: -150, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    wrapper.scrollBy({ left: 150, behavior: "smooth" });
  });
});
