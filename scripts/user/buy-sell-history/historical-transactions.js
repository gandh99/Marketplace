import { historicalTransactionsUrl } from '../../routes.js';
import { getToken } from '../../authentication/jwt.js';

populateTable();

function populateTable() {
    getTransactions()
        // .then(result => console.log(result))
}

function getTransactions() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', historicalTransactionsUrl);
        xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
        xhr.onload = () => {
            if (xhr.status == 200) {
                let transactions = xhr.response;
                // let transactions = JSON.parse(xhr.response);
                // resolve(xhr.response);
                console.log(transactions)
            } else if (xhr.status == 403) {
                displayMessage('Please login to view your historical transactions.');
            } else {
                console.log(xhr.response)
                displayMessage('Oops! An error occurred. Please try again later.');
            }
        };
        xhr.send();
    })
}

function displayMessage(message) {
    const messageArea = document.getElementsByClassName('message-area')[0];
    messageArea.innerHTML = message;
}