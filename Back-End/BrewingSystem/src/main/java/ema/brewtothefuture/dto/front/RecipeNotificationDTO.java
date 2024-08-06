package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public record RecipeNotificationDTO(
        String message,
        int send_after_days
) implements DTO { }
