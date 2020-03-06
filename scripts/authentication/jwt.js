import { tokenUrl } from '../routes.js';

export function saveTokens(tokenData) {
    tokenData = JSON.parse(tokenData);
    sessionStorage.setItem('accessToken', tokenData.accessToken);
    sessionStorage.setItem('refreshToken', tokenData.refreshToken);
}

function saveAccessToken(tokenData) {
    sessionStorage.setItem('accessToken', tokenData.accessToken);
}

export function getToken() {
    return sessionStorage.getItem('accessToken');
}

function getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
}

export function destroyTokens() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
}

export function refreshToken(done) {
    if (!getRefreshToken()) {
        done();
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', tokenUrl);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = () => {
        saveAccessToken(JSON.parse(xhr.response));
        done();
    };
    xhr.send(JSON.stringify({ refreshToken: getRefreshToken() }));
}