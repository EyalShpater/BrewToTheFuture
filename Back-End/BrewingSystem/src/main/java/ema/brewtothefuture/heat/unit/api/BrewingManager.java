package ema.brewtothefuture.heat.unit.api;

import ema.brewtothefuture.recipe.impl.Recipe;

public interface BrewingManager {
    Brew brewRecipe(String userId);

    Brew getBrew(String userId);

    Recipe getRecipe(String userId);

    void stopRecipe(int recipeId);

    void addRecipeToBrew(int recipeId, String userId);

    void markHeadOfQueueAsBrewed(String userId);
}
