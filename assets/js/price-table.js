document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector("#precios .pricing-table-wrapper");
  const table = document.querySelector("#precios .pricing-table");
  if (!wrapper || !table) return;

  const rows = table.querySelectorAll("tr");

  // Desktop hover only
  function setActiveColumn(index) {
    rows.forEach(row => {
      Array.from(row.children).forEach(cell =>
        cell.classList.remove("active")
      );
    });

    rows.forEach(row => {
      const cell = row.children[index];
      if (cell) cell.classList.add("active");
    });
  }

  if (window.innerWidth >= 1200) {
    rows.forEach(row => {
      Array.from(row.children).slice(1).forEach((cell, i) => {
        cell.addEventListener("mouseenter", () => {
          setActiveColumn(i + 1);
        });
      });
    });

    table.addEventListener("mouseleave", () => {
      setActiveColumn(1);
    });

    setActiveColumn(1);
  }
const leftArrow = document.querySelector(".precio-swipe.left");
const rightArrow = document.querySelector(".precio-swipe.right");

function updateArrows() {
  const scrollLeft = wrapper.scrollLeft;
  const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

  // Mostrar u ocultar flechas según scroll posible
  leftArrow.style.display = scrollLeft > 0 ? "block" : "none";
  rightArrow.style.display = scrollLeft < maxScroll ? "block" : "none";
}

// Detectar scroll y redimensionado
wrapper.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);

// Inicial
updateArrows();

// Opcional: añadir click para mover scroll
leftArrow.addEventListener("click", () => {
  wrapper.scrollBy({ left: -150, behavior: "smooth" });
});
rightArrow.addEventListener("click", () => {
  wrapper.scrollBy({ left: 150, behavior: "smooth" });
});

});
