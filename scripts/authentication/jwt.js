export function saveTokens(tokenData) {
    tokenData = JSON.parse(tokenData);
    sessionStorage.setItem('accessToken', tokenData.accessToken);
    sessionStorage.setItem('refreshToken', tokenData.refreshToken);
}

export function getToken() {
    return sessionStorage.getItem('accessToken');
}

export function destroyToken() {
    sessionStorage.removeItem('accessToken');
}