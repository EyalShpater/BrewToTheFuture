package ema.brewtothefuture.model.notification.api;

import ema.brewtothefuture.dto.front.NotificationDTO;

public interface Notification {
    void addNotification(String message);

    void addNotification(NotificationDTO notification);

    void addNotification(String message, boolean requiresApproval);

    void addNotification(String message, boolean requiresApproval, int status);

    NotificationDTO getHeadNotification();

    NotificationDTO getAndRemoveHeadNotification();

    void clearNotifications();
}
