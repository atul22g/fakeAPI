const KEY = 'fakeAPIToken';
export const getToken = () => localStorage.getItem(KEY);
export const saveToken = token => localStorage.setItem(KEY, token);
export const deleteToken = () => localStorage.removeItem(KEY, null);


const auth = 'fakeAPIAuth';
export const getAuth = () => localStorage.getItem(auth);
export const saveAuth = user => localStorage.setItem(auth, JSON.stringify(user));
export const deleteAuth = () => localStorage.removeItem(auth, null);


