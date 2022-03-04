//import printModule from './app.js';

// if (true) {
//   //! Динамический импорт
//   import('./app.js').then(({ default: printModule }) => {
//     printModule();
//   });
// }

document.addEventListener('click', async () => {
  const { default: printModule } = await import('./app.js');
  printModule();
});
console.log('In script file');

//=====================================

// function* idGenerator() {
//   let id = 1;

//   while (true) {
//     yield id;
//     id++;
//   }
// }

// const generator = idGenerator();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
