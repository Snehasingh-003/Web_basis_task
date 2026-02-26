"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vehicle {
    brand;
    constructor(brand) {
        this.brand = brand;
    }
    //normal method
    stop() {
        console.log("Vehicle stopped");
    }
}
class Car extends Vehicle {
    start() {
        console.log(`${this.brand} car started`);
    }
}
const car1 = new Car("bmw");
car1.start();
//# sourceMappingURL=vechicle_management.js.map