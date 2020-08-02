import handlerModal from './handlerModal'

const modalContacts = () => {
  const contactBlocks = document.querySelectorAll('.contacts');

  contactBlocks.forEach(item => item.addEventListener('click', () => {
    handlerModal('.popup-call', '.popup-close', '.popup-call');
  }));
};

export default modalContacts;