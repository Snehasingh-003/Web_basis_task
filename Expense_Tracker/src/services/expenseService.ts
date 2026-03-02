import { Transaction } from "../model/transaction";

export class ExpenseService{

    private mainbalance:number = 0;
    private transactions:Transaction[] = [];


     constructor() {
        this.loadbalance();
        this.loadTransactions();
    }  


    private loadbalance():void{

        const storedbalance = localStorage.getItem("mainbalance");    //Is there any balance stored in browser?
        
        // If balance exists: Convert string to number, Store inside mainBalance
        if(storedbalance){
            this.mainbalance = Number(storedbalance);
        }
    }

    private loadTransactions():void{
        const storedtransactions = localStorage.getItem("transactions");
         if (storedtransactions) {
            this.transactions = JSON.parse(storedtransactions);
        }
    }
//Set new monthly balance.
    setbalance(amount:number):void{
        if(amount<=0){
            throw new Error("Enter valid balance");
        }

        this.mainbalance = amount;
        localStorage.setItem("mainbalance",this.mainbalance.toString());
    }

    getbalance():number{
        return this.mainbalance;
    }

    addtransaction(
        title: string, amount: number, category: string, date: string
    ):void{
        if(amount <=0){
            throw new Error("Enter valid amount");
        }
        if(amount > this.mainbalance){
            throw new Error("Insufficient balance");
        }

        const newtransaction:Transaction = {
            id:Date.now().toString(),
            title,
            amount,
            category,
            date
        };

         this.transactions.push(newtransaction);

        this.mainbalance -= amount;

        localStorage.setItem("transactions", JSON.stringify(this.transactions));
        localStorage.setItem("mainbalance", this.mainbalance.toString());
    }
     getTransactions(): Transaction[] {
        return this.transactions;
    }





    // delete transaction then add back the money to main balance
    deleteTransaction(transactionId: string): void {

    const index = this.transactions.findIndex(t => t.id === transactionId);

    if (index === -1) {
        throw new Error("Transaction not found");
    }

    const deletedTransaction = this.transactions[index];

    // Add money back
    this.mainbalance += deletedTransaction.amount;

    // Remove transaction
    this.transactions.splice(index, 1);

    // Save updated data
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
    localStorage.setItem("mainbalance", this.mainbalance.toString());
}




// update transaction 
updateTransaction(
    id: string,
    newTitle: string,
    newAmount: number,
    newCategory: string,
    newDate: string
): void {

    const transaction = this.transactions.find(t => t.id === id);

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    if (newAmount <= 0) {
        throw new Error("Enter valid amount");
    }

    const difference = newAmount - transaction.amount;

    if (difference > this.mainbalance) {
        throw new Error("Insufficient balance for update");
    }

    // Adjust balance
    this.mainbalance -= difference;

    // Update transaction details
    transaction.title = newTitle;
    transaction.amount = newAmount;
    transaction.category = newCategory;
    transaction.date = newDate;

    localStorage.setItem("transactions", JSON.stringify(this.transactions));
    localStorage.setItem("mainbalance", this.mainbalance.toString());
}
}