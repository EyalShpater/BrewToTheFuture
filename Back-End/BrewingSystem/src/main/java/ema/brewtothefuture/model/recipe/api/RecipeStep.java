package ema.brewtothefuture.model.recipe.api;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.embedded.BrewStepDTO;
import ema.brewtothefuture.dto.front.RecipeStepDTO;

import java.util.Objects;

public record RecipeStep (
        int stepId,
        double temperature,
        int durationMinutes,
        boolean notifyOnComplete,
        String message
) implements DTOConvertible<BrewStepDTO> {
    public RecipeStep(RecipeStepDTO dto) {
        this(
                dto.step_id(),
                dto.temperature_celsius(),
                dto.duration_minutes(),
                dto.notify_on_completion(),
                dto.message()
        );
    }

    public RecipeStepDTO convertToFrontDTO() {
        return new RecipeStepDTO(
                stepId,
                temperature,
                durationMinutes,
                notifyOnComplete,
                message
        );
    }

    @Override
    public BrewStepDTO convertToDTO() {
        return new BrewStepDTO(
                stepId,
                temperature,
                durationMinutes,
                notifyOnComplete
        );
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) { return true; }
        if (o == null || getClass() != o.getClass()) { return false; }
        RecipeStep that = (RecipeStep) o;
        return stepId == that.stepId;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(stepId);
    }
}
