package ema.brewtothefuture.dto.embedded;

import ema.brewtothefuture.dto.api.DTO;

import java.util.List;

public record EmbeddedRecipeDTO(
        long brew_id,
        long recipe_id,
        String recipe_name,
        String user_id,
        List<BrewStepDTO> step
) implements DTO { }