import PushNotification, { PushNotificationOptions } from 'react-native-push-notification';

class NotificationHandler {
    lastRedirectTo = '';
    onNotification(notification) {
        console.log('onNotification:', notification);

        const redirect_to = notification?.data?.redirect_to;
        if (redirect_to && redirect_to.startsWith('/')) {
            this.lastRedirectTo = redirect_to;
        } else {
            this.lastRedirectTo = '';
        }

        if (typeof this._onNotification === 'function') {
            this._onNotification(notification);
        }
    }

    onRegister(token) {
        console.log('onRegister:', token);

        if (typeof this._onRegister === 'function') {
            this._onRegister(token);
        }
    }

    onAction(notification) {
        console.log('onAction Notification action received:');
        console.log(notification.action);
        console.log(notification);

        // if (notification.action === 'Yes') {
        //   PushNotification.invokeApp(notification as any);
        // }
    }

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError(err) {
        console.log(err);
    }

    attachRegister(handler) {
        this._onRegister = handler;
    }

    attachNotification(handler) {
        this._onNotification = handler;
    }

    setLastRedirectTo(value) {
        this.lastRedirectTo = value;
    }
}

const notificationHandler = new NotificationHandler();

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: notificationHandler.onRegister.bind(notificationHandler),

    // (required) Called when a remote or local notification is opened or received
    onNotification: notificationHandler.onNotification.bind(notificationHandler),

    // (optional) Called when Action is pressed (Android)
    onAction: notificationHandler.onAction.bind(notificationHandler),

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: notificationHandler.onRegistrationError.bind(notificationHandler),

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});

export default notificationHandler;