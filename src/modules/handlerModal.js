const handlerModal = (selector, closeBtn, overlay) => {
  const popup = document.querySelector(selector);
  popup.style.display = 'block';

  popup.addEventListener('click', (e) => {
    const target = e.target;

    if (target.matches(closeBtn) || target.matches(overlay)) {
      popup.style.display = 'none';
    }
  });
};

export default handlerModal;