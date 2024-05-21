package ema.brewtothefuture.dto.embedded;

import ema.brewtothefuture.dto.api.DTO;

import java.util.List;

public record EmbeddedRecipeDTO(
        int brew_id,
        int recipe_id,
        String recipe_name,
        String user_id,
        List<BrewStepDTO> step
) implements DTO { }