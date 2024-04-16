package ema.brewtothefuture.recipe.api;

import java.util.List;

public interface Recipe {
    void addStep(RecipeStep step);
    List<RecipeStep> getRecipe();
}
