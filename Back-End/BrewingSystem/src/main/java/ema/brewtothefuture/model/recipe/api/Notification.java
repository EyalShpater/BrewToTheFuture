package ema.brewtothefuture.model.recipe.api;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.NotificationDTO;


public record Notification (
        String message,
        int sendAfterNumOfDays
) implements DTOConvertible<NotificationDTO> {

    public Notification(NotificationDTO dto) {
        this(dto.message(), dto.send_after_days());
    }

    @Override
    public NotificationDTO convertToDTO() {
        return new NotificationDTO(message, sendAfterNumOfDays);
    }
}
