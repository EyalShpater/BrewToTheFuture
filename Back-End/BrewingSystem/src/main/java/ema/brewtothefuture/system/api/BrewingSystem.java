package ema.brewtothefuture.system.api;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.FermentableDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.dto.front.YeastDTO;
import ema.brewtothefuture.recipe.api.Hop;

import java.util.List;

public interface BrewingSystem {
    EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber); // to backend

    int addNewRecipe(RecipeDTO recipe);

    void markBrewingAsFinished(String deviceSerialNumber);

    List<FermentableDTO> getFermentables();

    List<Hop> getHops();

    List<YeastDTO> getYeast();

    List<RecipeDTO> getAllRecipes();

    void addViewedRecipe(int recipeId);

    void brewRecipe(int recipeId, String userId); // from front

    void addBrewingReport(String deviceId, BrewingReportDTO report);
}