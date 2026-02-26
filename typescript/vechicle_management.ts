abstract class Vehicle {
   
  constructor(public brand: string) {

  }
  //abstract method
  abstract start(): void;
  
  //normal method
  stop(): void {
    console.log("Vehicle stopped");
  }
}

class Car extends Vehicle {
  start(): void {
    console.log(`${this.brand} car started`);
  }
}

const car1 = new Car("bmw");
car1.start();