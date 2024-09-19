export const NOTIFY = 'notifications/add';
export const CLEAR = 'notifications/clear';
export const clearNotifications = () => ({type: CLEAR});
export const notify = notification => ({type: NOTIFY, notification});
