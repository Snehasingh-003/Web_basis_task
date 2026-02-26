"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    name;
    salary;
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        this.name = name;
        this.salary = salary;
    }
    getDetails() {
        console.log(`${this.name} earns ${this.salary}`);
    }
}
class Manager extends Employee {
    department;
    constructor(name, salary, department) {
        super(name, salary);
        this.department = department;
    }
    getDetails() {
        console.log(`${this.name} manages ${this.department}`);
    }
}
const m1 = new Manager("Sneha", 80000, "IT");
console.log(m1.getDetails());
//# sourceMappingURL=Emp_management.js.map