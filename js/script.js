// Initialisation des valeurs
let totalIncomes = parseFloat(localStorage.getItem('totalIncomes')) || 0;
let totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let balance = totalIncomes - totalExpenses;

// Sélection des éléments HTML pour manipulation
const transactionsTableBody = document.getElementById('transactions');
const totalIncomesSpan = document.getElementById('totalIncomes');
const totalExpensesSpan = document.getElementById('totalExpenses');
const balanceAmount = document.getElementById('balanceAmount');

// Fonction pour mettre à jour les données dans le stockage local
function updateLocalStorage() {
    localStorage.setItem('totalIncomes', totalIncomes.toFixed(2));
    localStorage.setItem('totalExpenses', totalExpenses.toFixed(2));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Fonction pour mettre à jour l'affichage du résumé
function updateSummary() {
    totalIncomesSpan.textContent = totalIncomes.toFixed(2) + 'F CFA';
    totalExpensesSpan.textContent = totalExpenses.toFixed(2) + 'F CFA';
    balanceAmount.textContent = balance.toFixed(2) + 'F CFA';
    updateLocalStorage();
}

// Fonction pour ajouter une transaction
function addTransaction() {
    const descriptionInput = document.getElementById('transactionDescription');
    const amountInput = document.getElementById('transactionAmount');
    const typeInput = document.getElementById('transactionType');

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    // Vérification des données saisies
    if (description === '' || isNaN(amount) || !['revenu', 'dépense'].includes(type)) {
        alert('Données saisies invalide !');
        return;
    }

    // Mise à jour des totaux
    if (type === 'revenu') {
        totalIncomes += amount;
    } else {
        totalExpenses += amount;
    }

    // Mise à jour du solde
    balance = totalIncomes - totalExpenses;

    // Ajout de la transaction à la liste
    transactions.push({
        description: description,
        amount: amount.toFixed(2),
        type: type
    });

    // Mise à jour de l'affichage
    updateSummary();
    updateTransactionTable();

    // Effacement des champs de saisie
    descriptionInput.value = '';
    amountInput.value = '';
}

// Fonction pour supprimer une transaction
function removeTransaction(amount, type, rowIndex) {
    // Mise à jour des totaux
    if (type === 'revenu') {
        totalIncomes -= amount;
    } else {
        totalExpenses -= amount;
    }

    // Mise à jour du solde
    balance = totalIncomes - totalExpenses;

    // Suppression de la transaction de la liste
    transactions.splice(rowIndex - 1, 1);

    // Mise à jour de l'affichage
    updateSummary();
    updateTransactionTable();
}

// Fonction pour mettre à jour l'affichage de la table des transactions
function updateTransactionTable() {
    // Effacement des lignes existantes
    transactionsTableBody.innerHTML = '';

    // Remplissage de la table avec les transactions mises à jour
    for (let i = 0; i < transactions.length; i++) {
        const transactionRow = transactionsTableBody.insertRow();
        const cellType = transactionRow.insertCell(0);
        const cellName = transactionRow.insertCell(1);
        const cellAmount = transactionRow.insertCell(2);
        const cellAction = transactionRow.insertCell(3);

        cellType.textContent = transactions[i].type.charAt(0).toUpperCase() + transactions[i].type.slice(1);
        cellName.textContent = transactions[i].description;
        cellAmount.textContent = `${transactions[i].amount}F CFA`;
        cellAction.innerHTML = `<button onclick="removeTransaction(${transactions[i].amount}, '${transactions[i].type}', ${i + 1})" class="delete-btn">Supprimer</button>`;
    }
}

// Remplissage de la table et du résumé lors du chargement de la page
updateTransactionTable();
updateSummary();
