const modalButtons = document.querySelectorAll('[data-modal-button]');
const modalButtonsClose = document.querySelectorAll('[data-modal-close]');
const allModals = document.querySelectorAll('[data-modal]');

//console.log('modalButtonsClose', modalButtonsClose);

//Кнопки открыть модалку
modalButtons.forEach((item) => {
  item.addEventListener('click', (e) => {
    const modalId = e.target.dataset.modalButton;

    const findModalElement = document.querySelector('#' + modalId);

    findModalElement.classList.remove('hidden');

    //Ещё один варинат закрытия по фейду
    // findModalElement
    //   .querySelector('.modal-window')
    //   .addEventListener('click', (e) => {
    //     e.stopPropagation();
    //   });
  });
});

//Кнопки закрыть модалку
modalButtonsClose.forEach((item) => {
  item.addEventListener('click', (e) => {
    const modalIdClose = e.target
      .closest('[data-modal]')
      .classList.add('hidden');
    //console.log('modalIdClose', modalIdClose);
  });
});

// Закрытие модалки по фейду
allModals.forEach((item) => {
  item.addEventListener('click', (e) => {
    const fadeBlocClick = e.target.classList.contains('fade-block');

    if (fadeBlocClick) {
      e.target.classList.add('hidden');
    } else if (!fadeBlocClick) {
      return;
    }
  });
});
