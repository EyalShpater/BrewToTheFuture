package ema.brewtothefuture.model.heatunit.api;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.NotificationDTO;
import ema.brewtothefuture.model.recipe.impl.Recipe;

import java.util.List;

public interface Brew {
    String getEndOfStepNotification(int stepId);

    NotificationDTO getNotification();

    void stop();

    void start(long embeddedReportInterval);

    Recipe getRecipe();

    EmbeddedRecipeDTO getEmbeddedRecipe();

    void addBrewingReport(BrewingReportDTO report);

    List<BrewingReportDTO> getReports();

    long getBrewId();

    void markCurrentStepAsComplete();
}
