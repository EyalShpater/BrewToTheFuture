package ema.brewtothefuture.model.heatunit.impl;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.model.heatunit.api.Brew;
import ema.brewtothefuture.model.heatunit.api.FermentationReport;
import ema.brewtothefuture.model.recipe.impl.Recipe;

import java.util.ArrayList;
import java.util.List;

public class BrewImpl implements Brew {
    private final int brewId;
    private final String userId;
    private Recipe recipe;
    private int currentStep;
    private List<FermentationReport> fermentationReports;
    private List<BrewingReportDTO> brewingReports;

    public BrewImpl(int id, String userId, Recipe recipe) {
        this.brewId = id;
        this.userId = userId;
        this.recipe = recipe;
        this.fermentationReports = new ArrayList<>();
        this.brewingReports = new ArrayList<>();
    }

    @Override
    public String getEndOfStepNotification(int stepId) {
        return null;
    }

    @Override
    public void stop() {

    }

    @Override
    public void start() {

    }

    @Override
    public Recipe getRecipe() {
        return recipe;
    }

    @Override
    public EmbeddedRecipeDTO getEmbeddedRecipe() {
        return recipe.createEmbeddedRecipeDTO(brewId);
    }

    @Override
    public void addBrewingReport(BrewingReportDTO report) {
        if (report != null) {
            brewingReports.add(report);
        }
    }

    @Override
    public List<BrewingReportDTO> getReports() {
        return brewingReports;
    }

    @Override
    public int getBrewId() {
        return brewId;
    }
}
