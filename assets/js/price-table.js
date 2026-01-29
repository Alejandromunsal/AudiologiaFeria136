
document.addEventListener("DOMContentLoaded", function() {
  const table = document.querySelector("#precios .pricing-table");
  const rows = table.querySelectorAll("tr");
  const headers = table.querySelector("thead tr").children;
  const mobileBullets = document.querySelector(".precio-bullets");

  // Indicadores de swipe
  const swipeLeft = document.querySelector(".precio-swipe.left");
  const swipeRight = document.querySelector(".precio-swipe.right");

  let currentIndex = 1; // columna inicial
  const maxCol = headers.length - 1;

  /* =========================
     ACTIVAR COLUMNA
  ========================= */
  function setActiveColumn(index) {
    if(index < 1) index = 1;
    if(index > maxCol) index = maxCol;

    rows.forEach(row => {
      Array.from(row.querySelectorAll("td, th")).forEach(cell => cell.classList.remove("active"));
    });

    rows.forEach(row => {
      const cell = Array.from(row.querySelectorAll("td, th"))[index];
      if(cell) cell.classList.add("active");
    });

    currentIndex = index;

    // Actualizar bullets
    mobileBullets.querySelectorAll("button").forEach((b,i)=>{
      b.classList.toggle("active", i === (currentIndex - 1));
    });

    // Actualizar indicadores de swipe
    updateSwipeIndicators();
  }

  /* =========================
     INDICADORES SWIPE
  ========================= */
  function updateSwipeIndicators(){
    const width = window.innerWidth;
    if(width >= 1200){
      swipeLeft.style.display = "none";
      swipeRight.style.display = "none";
    } else {
      swipeLeft.style.display = (currentIndex > 1) ? "block" : "none";
      swipeRight.style.display = (currentIndex < maxCol) ? "block" : "none";
    }
  }

  /* =========================
     HOVER (escritorio y tablet)
  ========================= */
  function enableHover() {
    rows.forEach(row => {
      const cells = Array.from(row.querySelectorAll("td, th")).slice(1);
      cells.forEach((cell, colIndex) => {
        cell.addEventListener("mouseenter", () => {
          if(window.innerWidth >= 769) setActiveColumn(colIndex + 1);
        });
      });
    });

    table.addEventListener("mouseleave", () => {
      if(window.innerWidth >= 769) setActiveColumn(1);
    });
  }

  /* =========================
     BULLETS
  ========================= */
  function createBullets(isTablet=false){
    mobileBullets.innerHTML = "";
    const numBullets = isTablet ? maxCol-1 : maxCol;

    for(let i=0;i<numBullets;i++){
      const btn = document.createElement("button");
      if(i===0) btn.classList.add("active");

      btn.addEventListener("click", ()=>{
        const oldIndex = currentIndex;
        currentIndex = i+1;
        updateColumns(isTablet);
        triggerSwipeAnim(i > oldIndex-1 ? 'left':'right');
        setActiveColumn(currentIndex);
      });

      mobileBullets.appendChild(btn);
    }
  }

  /* =========================
     ACTUALIZAR COLUMNAS MÓVILES
  ========================= */
  function updateColumns(isTablet=false){
    rows.forEach(row=>{
      Array.from(row.children).forEach(cell=>cell.classList.remove("mobile-active"));
      if(isTablet){
        if(currentIndex < maxCol){
          row.children[currentIndex].classList.add("mobile-active");
          row.children[currentIndex+1].classList.add("mobile-active");
        } else {
          row.children[maxCol].classList.add("mobile-active");
        }
      } else {
        row.children[currentIndex].classList.add("mobile-active");
      }
    });
  }

  /* =========================
     SWIPE TÁCTIL
  ========================= */
  let touchStartX = 0;
  let touchEndX = 0;

  table.addEventListener("touchstart",(e)=>{
    touchStartX = e.changedTouches[0].screenX;
  });

  table.addEventListener("touchend",(e)=>{
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe(){
    const width = window.innerWidth;
    if(width < 1200){
      const deltaX = touchEndX - touchStartX;
      if(Math.abs(deltaX) > 30){
        const isTablet = width >= 769;
        let direction = '';

        if(deltaX < 0){
          const maxBullet = isTablet ? maxCol-1 : maxCol;
          if(currentIndex < maxBullet) {
            currentIndex++;
            direction = 'left';
          }
        } else {
          if(currentIndex > 1) {
            currentIndex--;
            direction = 'right';
          }
        }

        setActiveColumn(currentIndex);
        updateColumns(isTablet);

        if(direction) triggerSwipeAnim(direction);
      }
    }
  }

  /* =========================
     ANIMACIÓN SWIPE
  ========================= */
  function triggerSwipeAnim(direction){
    table.classList.remove('swipe-anim-left','swipe-anim-right');
    if(direction === 'left') table.classList.add('swipe-anim-left');
    if(direction === 'right') table.classList.add('swipe-anim-right');
    setTimeout(()=> {
      table.classList.remove('swipe-anim-left','swipe-anim-right');
    }, 600);
  }

  /* =========================
     INICIALIZACIÓN RESPONSIVE
  ========================= */
  function init(){
    const width = window.innerWidth;

    if(width >= 1200){
      mobileBullets.style.display = "none";
      setActiveColumn(1);
    } else if(width >= 769){
      createBullets(true);
      updateColumns(true);
      mobileBullets.style.display = "flex";
      setActiveColumn(1);
    } else {
      createBullets(false);
      updateColumns(false);
      mobileBullets.style.display = "flex";
      setActiveColumn(currentIndex);
    }
  }

  enableHover();
  init();
  window.addEventListener("resize", init);
});

