// Notification menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample notifications data
    const notifications = [
        {
            id: 1,
            type: 'alert',
            title: 'Maintenance Alert',
            message: 'Scheduled maintenance for Cebu Infrastractrue 1 tomorrow at 10:00 AM.',
            time: '1 hour ago',
            read: false
        },
        {
            id: 2,
            type: 'warning',
            title: 'Power Fluctuation',
            message: 'Minor power fluctuations detected at Cebu Infrastractrue 2.',
            time: '3 hours ago',
            read: false
        },
        {
            id: 3,
            type: 'info',
            title: 'System Update',
            message: 'Infrastractrue monitoring system updated to version 2.4.1',
            time: '1 day ago',
            read: true
        },
        {
            id: 4,
            type: 'success',
            title: 'Maintenance Complete',
            message: 'Routine maintenance for Cebu Infrastractrue 3 completed successfully.',
            time: '2 days ago',
            read: true
        }
    ];

    // Get the bell icon element
    const bellIcon = document.getElementById('bell-icon');
    if (!bellIcon) {
        console.error('Bell icon not found!');
        return;
    }

     // Get the img element inside the bell icon div
     const bellImg = bellIcon.querySelector('img');
     if (!bellImg) {
         console.error('Bell icon image not found inside the bell-icon div!');
         return;
     }

    // Add notification badge if there are unread notifications
    const unreadCount = notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
        const badge = document.createElement('div');
        badge.className = 'notification-badge';
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        bellIcon.appendChild(badge);
    }

    // Create the notification menu
    const notificationMenu = document.createElement('div');
    notificationMenu.className = 'notification-menu';

    // Add header
    const header = document.createElement('div');
    header.className = 'notification-header';
    header.innerHTML = `
        <h3>Notifications</h3>
        <div class="notification-actions">
            <button id="mark-all-read">Mark all as read</button>
        </div>
    `;
    notificationMenu.appendChild(header);

    // Create notification body
    const notificationBody = document.createElement('div');
    notificationBody.className = 'notification-body';
    notificationBody.id = 'style-1';

    // Add notifications
    if (notifications.length > 0) {
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
            
            // Get icon based on notification type
            let iconHtml = '';
            switch(notification.type) {
                case 'alert':
                    iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/></svg>';
                    break;
                case 'warning':
                    iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>';
                    break;
                case 'info':
                    iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>';
                    break;
                case 'success':
                    iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>';
                    break;
                default:
                    iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>';
            }
            
            notificationItem.innerHTML = `
                <div class="notification-icon">
                    ${iconHtml}
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
            `;
            
            // Add click event to mark as read
            notificationItem.addEventListener('click', function() {
                // Mark as read logic here
                this.classList.add('read');
                this.classList.remove('unread');
                
                // Here you would typically update your data or make an API call
                console.log(`Notification ${notification.id} marked as read`);
            });
            
            notificationBody.appendChild(notificationItem);
        });
    } else {
        // No notifications
        const emptyState = document.createElement('div');
        emptyState.className = 'notification-empty';
        emptyState.textContent = 'No notifications at this time.';
        notificationBody.appendChild(emptyState);
    }

    notificationMenu.appendChild(notificationBody);

    // Add footer
    // const footer = document.createElement('div');
    // footer.className = 'notification-footer';
    // footer.innerHTML = '<a href="#all-notifications">View all notifications</a>';
    // notificationMenu.appendChild(footer);

    // Append menu to bell parent
    bellIcon.appendChild(notificationMenu);

    // Toggle menu when clicking the bell icon
    bellIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target === bellIcon || e.target === bellImg) {
            notificationMenu.classList.toggle('show');
        
            // Hide any other open menus (like app switcher)
            const appSwitcherMenu = document.querySelector('.app-switcher-menu');
            if (appSwitcherMenu) {
                appSwitcherMenu.classList.remove('show');
            }
        }
    });

    // Add "Mark all as read" functionality
    document.getElementById('mark-all-read').addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Mark all notifications as read
        const unreadItems = notificationBody.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
            item.classList.add('read');
        });
        
        // Remove the badge
        const badge = bellIcon.querySelector('.notification-badge');
        if (badge) {
            badge.remove();
        }
        
        // Here you would typically update your data or make an API call
        console.log('All notifications marked as read');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!bellIcon.contains(e.target)) {
            notificationMenu.classList.remove('show');
        }
    });
});