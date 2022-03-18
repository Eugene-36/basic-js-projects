class Person {
  #firstName;
  #lastName;
  #age;

  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  //Приветствие каждого человека
  greeting() {
    console.log(`Привет я человек и меня зовут ${this.#firstName}`);
  }

  // Возвращает полное имя человека
  get fullName() {
    return `Фамилия -${this.#lastName} Имя -${this.#firstName}`;
  }

  //  firstName, get and set
  get firstName() {
    return this.#firstName;
  }
  set firstName(value) {
    return (this.#firstName = value);
  }

  // lastname, get and set
  get lastName() {
    return this.#lastName;
  }

  set lastName(value) {
    this.#lastName = value;
  }

  // age get and set
  get age() {
    return this.#age;
  }

  set age(value) {
    if (value < 0) {
      this.#age = 0;
    } else {
      this.#age = value;
    }
  }
}

class Employee extends Person {
  #inn;
  #numer;
  #snils;

  constructor(firstName, lastName, age, inn, number, snils) {
    super(firstName, lastName, age);
    this.#inn = inn;
    this.#numer = number;
    this.#snils = snils;
  }
  greeting() {
    console.log(`Привет я работник и меня зовут ${this.firstName}`);
  }
}

class Developer extends Employee {
  #level;
  #language;

  constructor(firstName, lastName, age, inn, number, snils, level, language) {
    super(firstName, lastName, age, inn, number, snils);
    this.#level = level;
    this.#language = language;
  }

  greeting() {
    console.log(`Привет я работник и меня зовут ${this.firstName}`);
  }
}

const newDev = new Developer(
  'luxe',
  'Looter',
  15,
  15,
  15,
  555,
  'SENIOR',
  'JavaScript'
);
const employee = new Employee('Employee', 'TV', 15, 15, 15, 555);
const person = new Person('Person', 'TV', 15);

// newDev.greeting();
// employee.greeting();
// person.greeting();

const personGreeting = [newDev, employee, person];

function massGreeting(person) {
  for (let i = 0; i < person.length; i++) {
    const human = person[i];

    human.greeting();
    // console.log('person', human);
  }
}

massGreeting(personGreeting);
