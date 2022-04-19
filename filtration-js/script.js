const filterBox = document.querySelectorAll('.box');

document.querySelector('nav').addEventListener('click', (e) => {
  if (e.target.tagName !== 'LI') return false;

  let filterClass = e.target.dataset.f;

  console.log('filterClass', filterClass);
  filterBox.forEach((item) => {
    item.classList.remove('hide');
    if (!item.classList.contains(filterClass) && filterClass !== 'all') {
      item.classList.add('hide');
    }
  });
});
