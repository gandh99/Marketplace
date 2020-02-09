export function saveToken(token) {
    sessionStorage.setItem('token', token);
}

export function getToken() {
    return sessionStorage.getItem('token');
}