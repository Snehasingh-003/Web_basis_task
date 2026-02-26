"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BankAccount {
    user;
    balance;
    accountType;
    constructor(user, balance, accountType) {
        this.user = user;
        this.balance = balance;
        this.accountType = accountType;
    }
    deposit(amount) {
        this.balance += amount;
    }
    getBalance() {
        return this.balance;
    }
}
let acc = new BankAccount("sneha", 1000, "Savings");
acc.deposit(500);
console.log(acc.getBalance());
//# sourceMappingURL=Bankacc_system.js.map