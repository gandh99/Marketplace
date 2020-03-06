import { historicalTransactionsUrl } from '../../routes.js';
import { getToken, refreshToken } from '../../authentication/jwt.js';

let hasRefreshed = false;

populateTable();

function populateTable() {
    getTransactions()
        .then(displayTransactionsInTable)
}

function getTransactions() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', historicalTransactionsUrl);
        xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
        xhr.onload = () => {
            if (xhr.status == 200) {
                let transactions = JSON.parse(xhr.response);
                resolve(transactions);
                hasRefreshed = true;
            } else if (xhr.status == 401 || xhr.status == 403) {
                if (!hasRefreshed) {
                    refreshToken(populateTable);
                } else {
                    displayMessage('Please <a href="/html/authentication/login.html">login</a> to view your historical transactions.');
                    hasRefreshed = false;
                }
            } else {
                console.log(xhr.response)
                displayMessage('Oops! An error occurred. Please try again later.');
            }
        };
        xhr.send();
    })
}

function displayTransactionsInTable(transactions) {
    // Show the table
    let table = document.getElementsByClassName('transaction-table')[0];
    table.style.display = 'visible';

    // Add the transactions to the table
    for (let transaction of transactions) {
        addTransactionItem(transaction);
    }
}

function addTransactionItem(transaction) {
    let table = document.getElementsByClassName('transaction-table')[0];
    let tableRow = document.createElement('tr');
    let date = document.createElement('td');
    let category = document.createElement('td');
    let item = document.createElement('td');
    let buyer = document.createElement('td');
    let seller = document.createElement('td');
    let price = document.createElement('td');

    // Add data
    date.innerHTML = transaction.transaction_date.substring(0, 10); // We only want the date: YYYY-MM-DD
    category.innerHTML = transaction.item_category;
    item.innerHTML = transaction.item_name;
    buyer.innerHTML = transaction.buyer_username;
    seller.innerHTML = transaction.seller_username;
    price.innerHTML = transaction.item_price;

    // Append to the tableRow, and then to the table itself
    tableRow.appendChild(date);
    tableRow.appendChild(category);
    tableRow.appendChild(item);
    tableRow.appendChild(buyer);
    tableRow.appendChild(seller);
    tableRow.appendChild(price);
    table.appendChild(tableRow);
}

function displayMessage(message) {
    hideTable();
    const messageArea = document.getElementsByClassName('message-area')[0];
    messageArea.innerHTML = message;
}

function hideTable() {
    let table = document.getElementsByClassName('transaction-table')[0];
    table.style.display = 'none';
}