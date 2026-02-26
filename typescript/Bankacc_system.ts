class BankAccount {
  public user: string;
  private balance: number;
  protected accountType: string;

  constructor(user: string, balance: number, accountType: string) {
    this.user = user;
    this.balance = balance;
    this.accountType = accountType;
  }

  public deposit(amount: number) {
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

let acc = new BankAccount("sneha", 1000, "Savings");
acc.deposit(500);
console.log(acc.getBalance());