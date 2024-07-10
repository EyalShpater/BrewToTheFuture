package ema.brewtothefuture.heat.unit.api;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.recipe.impl.Recipe;

import java.util.List;

public interface Brew {
    String getEndOfStepNotification(int stepId);

    void stop();

    void start();

    Recipe getRecipe();

    EmbeddedRecipeDTO getEmbeddedRecipe();

    void addBrewingReport(BrewingReportDTO report);

    List<BrewingReportDTO> getReports();

    int getBrewId();
}
