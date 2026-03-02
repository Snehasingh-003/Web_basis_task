import { ExpenseService } from "../services/expenseService.js";
let editingTransactionId = null;
const service = new ExpenseService();
const balanceInput = document.getElementById("balanceInput");
const setBalanceBtn = document.getElementById("setBalanceBtn");
const currentBalanceDisplay = document.getElementById("currentBalance");
const transactionTableBody = document.getElementById("transactionTableBody");
// Show balance on load
currentBalanceDisplay.textContent = service.getbalance().toString();
setBalanceBtn.addEventListener("click", () => {
    const enteredBalance = Number(balanceInput.value);
    try {
        service.setbalance(enteredBalance);
        currentBalanceDisplay.textContent = service.getbalance().toString();
        balanceInput.value = "";
    }
    catch (error) {
        alert(error.message);
    }
});
const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const dateInput = document.getElementById("dateInput");
const addTransactionBtn = document.getElementById("addTransactionBtn");
addTransactionBtn.addEventListener("click", () => {
    const title = titleInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    try {
        if (editingTransactionId) {
            service.updateTransaction(editingTransactionId, title, amount, category, date);
            editingTransactionId = null;
        }
        else {
            service.addtransaction(title, amount, category, date);
        }
        currentBalanceDisplay.textContent = service.getbalance().toString();
        renderTransactions();
        titleInput.value = "";
        amountInput.value = "";
        categoryInput.value = "";
        dateInput.value = "";
    }
    catch (error) {
        alert(error.message);
    }
});
function renderTransactions() {
    transactionTableBody.innerHTML = "";
    const transactions = service.getTransactions();
    transactions.forEach((t) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${t.title}</td>
            <td> ${t.amount}</td>
            <td>${t.category}</td>
            <td>${t.date}</td>
            <td>
               <button data-id="${t.id}" class="editBtn">Edit</button>
              <button data-id="${t.id}" class="deleteBtn">Delete</button>
            </td>
        `;
        transactionTableBody.appendChild(row);
    });
    attachDeleteEvents();
    attachEditEvents();
}
renderTransactions();
function attachDeleteEvents() {
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            if (!id)
                return;
            try {
                service.deleteTransaction(id);
                // Updating balance display
                currentBalanceDisplay.textContent = service.getbalance().toString();
                renderTransactions();
            }
            catch (error) {
                alert(error.message);
            }
        });
    });
}
function attachEditEvents() {
    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            if (!id)
                return;
            const transaction = service.getTransactions().find(t => t.id === id);
            if (!transaction)
                return;
            editingTransactionId = id;
            titleInput.value = transaction.title;
            amountInput.value = transaction.amount.toString();
            categoryInput.value = transaction.category;
            dateInput.value = transaction.date;
        });
    });
}
