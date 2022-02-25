// let a = 10;

// function outer() {
//   let b = 20;

//   function inner() {
//     let c = 30;

//     console.log(a, b, c);
//   }

//   inner();
// }

// outer();

//! Scope ===============
// function outer() {
//   let counter = 0;

//   function inner() {
//     counter++;
//     console.log(counter);
//   }
//   return inner;
// }

// const fn = outer();
// fn();
// fn();

//* ====================

// function Person(fName, lName) {
//   this.firstName = fName;
//   this.lastName = lName;
// }

// Person.prototype.getFullName = function () {};

// function SuperHero(fName, lName) {
//   this.isSuperHero = true;
// }
// SuperHero.prototype.fightCrime = function () {
//   console.log('Fighting crime');
// };

//const p1 = new Person('Vishwas');
//const p2 = new Person('Batman');

//===========================================
const obj = {
  [Symbol.iterator]: function () {
    const iterator = {};
    return iterator;
  },
};
