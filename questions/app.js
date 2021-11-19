//using selectors inside the element

const questions = document.querySelectorAll('.question');

questions.forEach((item) => {
  //console.log(item);
  const btn = item.querySelector('.question-btn');
  //console.log(btn);
  btn.addEventListener('click', () => {
    questions.forEach((singleItem) => {
      if (singleItem !== item) {
        singleItem.classList.remove('show-text');
      }
    });

    item.classList.toggle('show-text');
  });

  //item.addEventListener('click', (e) => {});
});

// traversing the dom

// const btns = document.querySelectorAll('.question-btn');

// console.log(btns);

// btns.forEach((item) => {
//   item.addEventListener('click', (e) => {
//     const currentElement = e.currentTarget.parentElement.parentElement;

//     currentElement.classList.toggle('show-text');
//   });
// });
