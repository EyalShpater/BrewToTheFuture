package ema.brewtothefuture.model.heatunit.api;

import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.model.recipe.impl.Recipe;

public interface Brew {
    String getEndOfStepNotification(int stepId);

    void stop();

    void start();

    Recipe getRecipe();

    EmbeddedRecipeDTO getEmbeddedRecipe();

//    void addBrewingReport(BrewingReportDTO report);
//
//    List<BrewingReportDTO> getReports();

    long getBrewId();
}
