//Композиция и агрегация

class Engine {
  drive() {
    console.log('Двигатель работает');
  }
}

class Wheel {
  drive() {
    console.log('колёса едут');
  }
}

class Freshener {}

class Flat {
  freshener;

  constructor(freshener) {
    this.freshener = freshener;
  }
}

class Car {
  engine;
  wheels = [];
  freshener;
  constructor(freshener) {
    //Агрегация
    this.freshener = freshener;
    //Композиция
    this.engine = new Engine();
    this.wheels.push(new Wheel());
    this.wheels.push(new Wheel());
    this.wheels.push(new Wheel());
    this.wheels.push(new Wheel());
  }

  //делигирование
  drive() {
    this.engine.drive();
    for (let i = 0; i < this.wheels.length; i++) {
      this.wheels[i].drive();
    }
  }
}

const bmw = new Car();
bmw.drive();
