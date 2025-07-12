// Notifications module

let notifications = [];
let unreadCount = 0;

// Initialize notifications
function initializeNotifications() {
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const markAllRead = document.getElementById('markAllRead');

    // Toggle notification dropdown
    notificationIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('show');
        }
    });

    // Mark all as read
    markAllRead.addEventListener('click', markAllNotificationsAsRead);
}

// Add new notification
function addNotification(content, type, relatedId) {
    const notification = {
        id: Date.now(),
        content,
        type,
        relatedId,
        timestamp: new Date(),
        read: false
    };
    
    notifications.unshift(notification);
    updateNotificationsUI();
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
    notifications.forEach(notification => notification.read = true);
    updateNotificationsUI();
}

// Update notifications UI
function updateNotificationsUI() {
    unreadCount = notifications.filter(n => !n.read).length;
    
    // Update count badge
    const notificationCount = document.getElementById('notificationCount');
    notificationCount.textContent = unreadCount;
    notificationCount.style.display = unreadCount > 0 ? 'flex' : 'none';
    
    // Update notification list
    const notificationList = document.getElementById('notificationList');
    
    if (notifications.length === 0) {
        notificationList.innerHTML = '<div class="notification-empty">No notifications yet</div>';
        return;
    }
    
    notificationList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.read ? '' : 'unread'}" 
             onclick="handleNotificationClick(${notification.id})">
            <div class="notification-content">${notification.content}</div>
            <div class="notification-meta">
                ${timeAgo(notification.timestamp)}
            </div>
        </div>
    `).join('');
}

// Handle notification click
function handleNotificationClick(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        updateNotificationsUI();
        
        // Scroll to related content if applicable
        if (notification.relatedId) {
            const element = document.querySelector(`[data-id="${notification.relatedId}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.style.backgroundColor = '#fff3cd';
                setTimeout(() => {
                    element.style.backgroundColor = '';
                }, 2000);
            }
        }
    }
}

// Time ago formatter
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + ' years ago';
    if (interval === 1) return 'a year ago';
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + ' months ago';
    if (interval === 1) return 'a month ago';
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + ' days ago';
    if (interval === 1) return 'a day ago';
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + ' hours ago';
    if (interval === 1) return 'an hour ago';
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + ' minutes ago';
    if (interval === 1) return 'a minute ago';
    
    return 'just now';
}

// Get notification count
function getUnreadCount() {
    return unreadCount;
}

// Clear all notifications
function clearNotifications() {
    notifications = [];
    updateNotificationsUI();
}

export {
    initializeNotifications,
    addNotification,
    markAllNotificationsAsRead,
    getUnreadCount,
    clearNotifications
}; 