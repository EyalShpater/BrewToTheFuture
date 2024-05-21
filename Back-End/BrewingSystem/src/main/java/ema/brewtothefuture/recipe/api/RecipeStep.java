package ema.brewtothefuture.recipe.api;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.RecipeStepDTO;

public record RecipeStep (
        int stepId,
        double temperature,
        int durationMinutes,
        boolean notifyOnComplete,
        String message
) implements DTOConvertible<RecipeStepDTO> {
    public RecipeStep(RecipeStepDTO dto) {
        this(
                dto.step_id(),
                dto.temperature_celsius(),
                dto.duration_minutes(),
                dto.notify_on_completion(),
                dto.message()
        );
    }

    @Override
    public RecipeStepDTO convertToDTO() {
        return new RecipeStepDTO(
                stepId,
                temperature,
                durationMinutes,
                notifyOnComplete,
                message
        );
    }
}
