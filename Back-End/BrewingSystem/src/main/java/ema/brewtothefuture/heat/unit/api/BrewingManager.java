package ema.brewtothefuture.heat.unit.api;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.recipe.impl.Recipe;

import java.util.List;

public interface BrewingManager {
    Brew brewRecipeInQueue(String userId);

    Brew getBrewInQueue(String userId);

    Recipe getRecipeInQueue(String userId);

    void stopRecipeInQueue(int recipeId);

    void addRecipeToBrew(int recipeId, String userId);

    void markHeadOfQueueAsBrewedInQueue(String userId);

    List<BrewingReportDTO> getBrewHistory(String userId, int brewId);
}
