import { authenticateUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';

// Send input data to server
sendInputData(getToken())
    .then(response => {
        if (response.status == 200) {
            sessionStorage.setItem('username', response.data);
            $("#account-menu-area").load("../../../html/components/account-menu-user.html");
        } else if (response.status == 401 || response.status == 403 || response.status == 404) {
            $("#account-menu-area").load("../../../html/components/account-menu-guest.html");
        }
    }).catch(err => {
        console.log(err);
    });

function sendInputData(token) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', authenticateUrl);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.onload = () => {
            resolve({ status: xhr.status, data: xhr.response });
        };
        xhr.send();
    });

    return promise;
}