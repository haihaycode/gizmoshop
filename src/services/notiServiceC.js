//
export const saveNotifications = (note) => {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const newNotification = {
        id: new Date().getTime(),
        note,
        timestamp: new Date().toISOString()
    };
    notifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
};
export const deleteNotificationById = (id) => {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
};
export const getNotifications = () => {
    return JSON.parse(localStorage.getItem('notifications')) || [];
};
export const deleteAllNotifications = () => {
    localStorage.removeItem('notifications');
};