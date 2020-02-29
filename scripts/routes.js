/* Scripts on the client side that need to make API calls to the server will refer to these endpoints */

export const host = 'http://localhost:5000';
export const authenticateUrl = host + '/authenticate';
export const registerUrl = host + '/users/register';
export const loginUrl = host + '/users/login';
export const logoutUrl = host + '/users/logout';
export const addItemUrl = host + '/account/add-item';
export const getItemUrl = host + '/account/get-item';
export const deleteItemUrl = host + '/account/delete-item';
export const itemCategoryUrl = host + '/items/category/';    // needs to be appended with the specific category
export const buyItemUrl = host + '/items/buy';
export const historicalTransactionsUrl = host + '/items/history';