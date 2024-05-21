package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public record RecipeStepDTO(
        int step_id,
        double temperature_celsius,
        int duration_minutes,
        boolean notify_on_completion,
        String message
) implements DTO { }
