"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Student {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return `Hi, I'm ${this.name}`;
    }
}
const student1 = new Student("sneha", 22);
console.log(student1.name);
console.log(student1.greet());
//# sourceMappingURL=Student_info.js.map