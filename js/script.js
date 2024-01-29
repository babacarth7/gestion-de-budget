// initialisation des valeurs
let totalIncomes = 0;
let totalExpenses = 0;
let balance = 0;

const transactionsTableBody = document.getElementById('transactions');
const totalIncomesSpan = document.getElementById('totalIncomes');
const totalExpensesSpan = document.getElementById('totalExpenses');
const balanceAmount = document.getElementById('balanceAmount');

function updateSummary() {
    totalIncomesSpan.textContent = totalIncomes.toFixed(2) + 'F CFA';
    totalExpensesSpan.textContent = totalExpenses.toFixed(2) + 'F CFA';
    balanceAmount.textContent = balance.toFixed(2) + 'F CFA';
}

function addTransaction() {
    const descriptionInput = document.getElementById('transactionDescription');
    const amountInput = document.getElementById('transactionAmount');
    const typeInput = document.getElementById('transactionType');

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description === '' || isNaN(amount) || !['revenu', 'dépense'].includes(type)) {
        alert('Please enter valid values for description, amount, and type.');
        return;
    }

    if (type === 'revenu') {
        totalIncomes += amount;
    } else {
        totalExpenses += amount;
    }

    balance = totalIncomes - totalExpenses;
    updateSummary();

    const transactionRow = transactionsTableBody.insertRow();
    const cellType = transactionRow.insertCell(0);
    const cellName = transactionRow.insertCell(1);
    const cellAmount = transactionRow.insertCell(2);
    const cellAction = transactionRow.insertCell(3);


    cellName.textContent = description;
    cellAmount.textContent = `${amount.toFixed(2)} F CFA`;
    cellType.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    cellAction.innerHTML = `<button onclick="removeTransaction(${amount}, '${type}', ${transactionRow.rowIndex})" class="delete-btn">Supprimer</button>`;

    // Clear input fields
    descriptionInput.value = '';
    amountInput.value = '';
}

function removeTransaction(amount, type, rowIndex) {
    if (type === 'revenu') {
        totalIncomes -= amount;
    } else {
        totalExpenses -= amount;
    }

    balance = totalIncomes - totalExpenses;
    updateSummary();

    // Remove the transaction row
    transactionsTableBody.deleteRow(rowIndex - 1);
}