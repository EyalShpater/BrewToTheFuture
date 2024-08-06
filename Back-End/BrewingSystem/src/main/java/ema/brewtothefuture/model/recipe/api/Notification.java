package ema.brewtothefuture.model.recipe.api;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.RecipeNotificationDTO;


public record Notification (
        String message,
        int sendAfterNumOfDays
) implements DTOConvertible<RecipeNotificationDTO> {

    public Notification(RecipeNotificationDTO dto) {
        this(dto.message(), dto.send_after_days());
    }

    @Override
    public RecipeNotificationDTO convertToDTO() {
        return new RecipeNotificationDTO(message, sendAfterNumOfDays);
    }
}
