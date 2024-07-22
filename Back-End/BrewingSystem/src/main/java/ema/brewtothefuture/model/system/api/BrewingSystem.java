package ema.brewtothefuture.model.system.api;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.FermentableDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.dto.front.YeastDTO;
import ema.brewtothefuture.model.recipe.api.Hop;

import java.util.List;

public interface BrewingSystem {
    /* Embedded Use Methods*/

    EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber);

    void markBrewingAsFinished(String deviceSerialNumber);

    void addBrewingReport(String deviceId, BrewingReportDTO report);


    /* Frontend Use Methods */

    int addNewRecipe(RecipeDTO recipe);

    List<FermentableDTO> getFermentables();

    List<Hop> getHops();

    List<YeastDTO> getYeast();

    List<RecipeDTO> getAllRecipes();

    void addViewedRecipe(int recipeId);

    void brewRecipe(int recipeId, String userId);

    List<BrewingReportDTO> getBrewingReport(String userId, int brewId);

    List<String> getBrewingMethods();

    List<String> getBrewingStyle();

    void loadData();
}