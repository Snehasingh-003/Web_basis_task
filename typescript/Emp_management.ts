class Employee {

  constructor(protected name: string, protected salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getDetails(): void {
    console.log(`${this.name} earns ${this.salary}`);
    
  }
}

class Manager extends Employee {

  department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary);
    this.department = department;
  }

  getDetails(): void {
    console.log(`${this.name} manages ${this.department}`);
  }
}

const m1 = new Manager("Sneha", 80000, "IT");
console.log(m1.getDetails());