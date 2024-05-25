package ema.brewtothefuture.heat.unit.api;

import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.recipe.impl.Recipe;

public interface Brew {
    String getEndOfStepNotification(int stepId);
    void stop();
    void start();
    Recipe getRecipe();
    EmbeddedRecipeDTO getEmbeddedRecipe();
}
