const KEY = 'fakeAPIToken';
export const getToken = () => localStorage.getItem(KEY);
export const saveToken = token => localStorage.setItem(KEY, token);
export const deleteToken = () => localStorage.removeItem(KEY, null);


