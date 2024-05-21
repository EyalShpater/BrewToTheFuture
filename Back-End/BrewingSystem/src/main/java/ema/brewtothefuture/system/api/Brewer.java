package ema.brewtothefuture.system.api;

import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.FermentableDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.dto.front.YeastDTO;
import ema.brewtothefuture.recipe.api.Hop;

import java.util.List;

public interface Brewer {
    EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber); // to backend
    void addNewRecipe(RecipeDTO recipe);
    List<FermentableDTO> getFermentables();
    List<Hop> getHops();
    List<YeastDTO> getYeast();
    void addViewedRecipe(int recipeId);
    void brewRecipe(RecipeDTO recipe, String userId); // from front
}