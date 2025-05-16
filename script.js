const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');
const balanceDisplay = document.getElementById('balance');

const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');

const incomeInput = document.getElementById('income-input');
const descriptionInput = document.getElementById('description');
const expenseAmountInput = document.getElementById('expense-amount');

const transactionList = document.getElementById('transaction-list');

let income = parseFloat(localStorage.getItem('income')) || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateUI() {
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = income - totalExpense;

  incomeDisplay.textContent = `₹${income.toFixed(2)}`;
  expenseDisplay.textContent = `₹${totalExpense.toFixed(2)}`;
  balanceDisplay.textContent = `₹${balance.toFixed(2)}`;

  renderTransactions();
}

function renderTransactions() {
  transactionList.innerHTML = '';
  expenses.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.description} <span>- ₹${item.amount}</span>
    `;
    transactionList.appendChild(li);
  });
}

incomeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = parseFloat(incomeInput.value);
  if (!isNaN(value) && value > 0) {
    income = value;
    localStorage.setItem('income', income);
    updateUI();
    incomeForm.reset();
  }
});

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (description && !isNaN(amount) && amount > 0) {
    expenses.push({ description, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateUI();
    expenseForm.reset();
  }
});

updateUI();
