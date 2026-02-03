document.addEventListener('DOMContentLoaded', () => {
  const openButtons = document.querySelectorAll('.btn-open-modal');
  const closeButtons = document.querySelectorAll('.close-btn');
  const body = document.body;
  let activeModal = null;

  // Abrir modal
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('is-active');
        body.classList.add('modal-open');
        activeModal = modal;
      }
    });
  });

  // Cerrar modal
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  // Click fuera del contenido
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Cerrar con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) closeModal(activeModal);
  });

  function closeModal(modal) {
    modal.classList.add('is-closing');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('is-active', 'is-closing');
      body.classList.remove('modal-open');
      activeModal = null;
    }, 300);
  }
});
