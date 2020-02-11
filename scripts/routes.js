/* Scripts on the client side that need to make API calls to the server will refer to these endpoints */

export const host = 'http://localhost:5000';
export const registerUrl = host + '/users/register';
export const loginUrl = host + '/users/login';
export const logoutUrl = host + '/users/logout';
export const authenticateUrl = host + '/users/authenticate';