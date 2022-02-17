function app() {
  const buttons = document.querySelectorAll('.button');
  const cards = document.querySelectorAll('.card');

  function filter(category, items) {
    items.forEach((item) => {
      const isItemFiltered = !item.classList.contains(category);
      const isShowAll = category.toLowerCase() === 'all';
      console.log();
      if (isItemFiltered && !isShowAll) {
        item.classList.add('anime');
      } else {
        item.classList.remove('hide');
        item.classList.remove('anime');
      }
    });
  }

  //! Вешаем обработчик на каждую из карточек и получаем dataset
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const currentCategory = button.dataset.filter;
      filter(currentCategory, cards);
    });
  });

  cards.forEach((card) => {
    card.ontransitionend = function () {
      if (card.classList.contains('anime')) {
        card.classList.add('hide');
        console.log('Анимация ЗАВЕРШЕНА!');
      }
    };
  });
}

app();
console.log('work fine');
