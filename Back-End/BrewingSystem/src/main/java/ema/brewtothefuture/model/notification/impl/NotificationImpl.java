package ema.brewtothefuture.model.notification.impl;

import ema.brewtothefuture.dto.front.NotificationDTO;
import ema.brewtothefuture.model.notification.api.Notification;

import java.util.LinkedList;
import java.util.Queue;

public class NotificationImpl implements Notification {
    private       Queue<NotificationDTO> notifications;
    private final Object                 notificationsQueueLock = new Object();

    public static final int STATUS_OK    = 200;
    public static final int STATUS_ERROR = 500;

    public NotificationImpl() {
        notifications = new LinkedList<>();
    }

    @Override
    public void addNotification(String message) {
        synchronized (notificationsQueueLock) {
            if (!message.isEmpty()) {
                notifications.add(
                        new NotificationDTO(
                                message,
                                System.currentTimeMillis(),
                                false,
                                STATUS_OK));
            }
        }
    }

    @Override
    public void addNotification(NotificationDTO notification) {
        synchronized (notificationsQueueLock) {
            notifications.add(notification);
        }
    }

    @Override
    public void addNotification(String message, boolean requiresApproval) {
        addNotification(new NotificationDTO(message, System.currentTimeMillis(), requiresApproval, STATUS_OK));
    }

    @Override
    public void addNotification(String message, boolean requiresApproval, int status) {
        addNotification(new NotificationDTO(message, System.currentTimeMillis(), requiresApproval, status));
    }

    @Override
    public NotificationDTO getHeadNotification() {
        synchronized (notificationsQueueLock) {
            return notifications.peek();
        }
    }

    @Override
    public NotificationDTO getAndRemoveHeadNotification() {
        synchronized (notificationsQueueLock) {
            return notifications.poll();
        }
    }

    @Override
    public void clearNotifications() {
        synchronized (notificationsQueueLock) {
            notifications.clear();
        }
    }
}
