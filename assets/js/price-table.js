document.addEventListener("DOMContentLoaded", function(){
  const wrapper = document.querySelector("#precios .pricing-table-wrapper");
  const table = document.querySelector("#precios .pricing-table");
  const rows = table.querySelectorAll("tr");

  // Hover escritorio
  function setActiveColumn(index){
    rows.forEach(row=>{
      Array.from(row.children).forEach(cell=>cell.classList.remove("active"));
    });
    rows.forEach(row=>{
      const cell = row.children[index];
      if(cell) cell.classList.add("active");
    });
  }

  rows.forEach(row=>{
    Array.from(row.children).slice(1).forEach((cell,i)=>{
      cell.addEventListener("mouseenter", ()=>{
        if(window.innerWidth >= 1200) setActiveColumn(i+1);
      });
    });
  });

  table.addEventListener("mouseleave", ()=>{
    if(window.innerWidth >= 1200) setActiveColumn(1);
  });

  if(window.innerWidth >= 1200) setActiveColumn(1);

  // Scroll snap
  let currentIndex = 1;
  const maxCol = rows[0].children.length-1;

  function scrollToColumn(index){
    const firstRow = rows[0].children;
    const cell = firstRow[index];
    if(!cell) return;
    const cellCenter = cell.offsetLeft + cell.offsetWidth/2;
    const wrapperCenter = wrapper.offsetWidth/2;
    wrapper.scrollTo({left: cellCenter - wrapperCenter, behavior: "smooth"});
  }

  function updateIndex(newIndex){
    if(newIndex<1) newIndex=1;
    if(newIndex>maxCol) newIndex=maxCol;
    currentIndex=newIndex;
    scrollToColumn(currentIndex);
    if(window.innerWidth >= 1200) setActiveColumn(currentIndex);
  }

  // Swipe táctil
  let touchStartX = 0;
  wrapper.addEventListener("touchstart", e=>{touchStartX = e.touches[0].clientX});
  wrapper.addEventListener("touchend", e=>{
    const delta = touchStartX - e.changedTouches[0].clientX;
    if(Math.abs(delta) > 30){
      if(delta>0) updateIndex(currentIndex+1);
      else updateIndex(currentIndex-1);
    }
  });

  // Inicial
  scrollToColumn(currentIndex);
});
