"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class shape {
}
class circle extends shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    calc_area() {
        return Math.PI * this.radius * this.radius;
    }
}
let c = new circle(5);
console.log(c.calc_area);
//# sourceMappingURL=Area_calc.js.map