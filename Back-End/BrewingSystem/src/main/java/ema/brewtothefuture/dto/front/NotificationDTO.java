package ema.brewtothefuture.dto.front;

public record NotificationDTO(
        String message,
        long timestamp,
        boolean requires_approval,
        int status
) {
}
