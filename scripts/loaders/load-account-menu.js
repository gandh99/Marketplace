import { authenticateUrl } from '../routes.js';
import { getToken, refreshToken } from '../authentication/jwt.js';

let hasRefreshed = false;

serveAccountMenuOptions();

// Send input data to server
function serveAccountMenuOptions() {
    sendInputData(getToken())
        .then(response => {
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

// Pings the server to check if current user is authenticated. Receives username in response if true.
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
                    hasRefreshed = true;
                } else {
                    hasRefreshed = false;
                    $("#account-menu-area").load("/html/components/account-menu-guest.html");
                }
            }
        };
        xhr.send();
    });
}