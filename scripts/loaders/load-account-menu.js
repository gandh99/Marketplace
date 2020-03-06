import { authenticateUrl } from '../routes.js';
import { getToken, refreshToken } from '../authentication/jwt.js';

let hasRefreshed = false;

serveAccountMenuOptions();

// Send input data to server
function serveAccountMenuOptions() {
    sendInputData(getToken())
        .then(response => {
            console.log(response)
            if (response.status == 200) {
                sessionStorage.setItem('username', response.data);
                $("#account-menu-area").load("/html/components/account-menu-user.html");
            } else if (response.status == 401 || response.status == 403 || response.status == 404) {
                $("#account-menu-area").load("/html/components/account-menu-guest.html");
            }
        }).catch(err => {
            console.log(err);
        });
}

function sendInputData(token) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', authenticateUrl);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.onload = () => {
            if (xhr.status == 200) {
                resolve({ status: xhr.status, data: xhr.response });
                hasRefreshed = true;
            } else {
                if (!hasRefreshed) {
                    refreshToken(serveAccountMenuOptions);
                } else {
                    hasRefreshed = false;
                }
            }
        };
        xhr.send();
    });
}