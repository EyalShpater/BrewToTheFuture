package ema.brewtothefuture.model.system.api;

import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.embedded.FermentationReportDTO;
import ema.brewtothefuture.dto.front.NotificationDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;

import java.util.List;

public interface BrewingSystem {
    /* Embedded Use Methods */

    EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber);

    void startBrewing(String deviceSerialNumber, long embeddedReportInterval);

    void markBrewingAsFinished(String deviceSerialNumber);

    void addBrewingReport(String deviceId, BrewingReportDTO report);

    void addFermentationReport(String deviceSerialNumber, FermentationReportDTO report);


    /* Frontend Use Methods */

    long addNewRecipe(RecipeDTO recipe);

    List<RecipeDTO> getAllRecipes();

    List<RecipeDTO> getAllUserRecipes(String userId);

    void deleteRecipe(long recipeId, String userId);

    void addViewedRecipe(int recipeId);

    void brewRecipe(long recipeId, String userId);

    List<BrewingReportDTO> getBrewingReport(String userId);

    BrewingReportDTO getLatestBrewingReport(String userId);

    List<FermentationReportDTO> getFermentationReport(String userId);

    FermentationReportDTO getLatestFermentationReport(String userId);

    List<String> getBrewingMethods();

    List<String> getBrewingStyle();

    List<HopDB> getHops();

    HopDB getHopById(long id);

    List<YeastDB> getYeasts();

    YeastDB getYeastById(long id);

    List<FermentableDB> getFermentables();

    FermentableDB getFermentableById(long id);

    NotificationDTO getNotification(String userID);

    void loadData();

    void markCurrentStepAsComplete(String userId);

    int getBrewStatus(String deviceSerialNumber);

    /***** debug methods *****/
    void addNotification(String userId, String message);
}