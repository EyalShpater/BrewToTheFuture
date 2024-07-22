package ema.brewtothefuture.service;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.FermentableDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.dto.front.YeastDTO;
import ema.brewtothefuture.model.heatunit.api.Brew;
import ema.brewtothefuture.model.heatunit.api.BrewingManager;
import ema.brewtothefuture.model.heatunit.api.DeviceManager;
import ema.brewtothefuture.model.heatunit.impl.BrewingManagerImpl;
import ema.brewtothefuture.model.heatunit.impl.DeviceManagerImpl;
import ema.brewtothefuture.model.recipe.api.BrewMethod;
import ema.brewtothefuture.model.recipe.api.BrewStyle;
import ema.brewtothefuture.model.recipe.api.Hop;
import ema.brewtothefuture.model.recipe.impl.Recipe;
import ema.brewtothefuture.model.recipe.impl.RecipeManager;
import ema.brewtothefuture.model.system.api.BrewingSystem;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrewingSystemService implements BrewingSystem {
    private final RecipeManager  recipeManager  = RecipeManager.getInstance();
    private final BrewingManager brewingManager = new BrewingManagerImpl();
    private final DeviceManager  deviceManager  = new DeviceManagerImpl();

    @Override
    public EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber) {
        String userId = deviceManager.getUser(deviceSerialNumber);
        Brew brew = brewingManager.getBrewInQueue(userId);

        return brew != null ?
                brew.getEmbeddedRecipe() :
                null;
    }

    @Override
    public List<FermentableDTO> getFermentables() {
        return null;
    }

    @Override
    public List<Hop> getHops() {
        return List.of();
    }

    @Override
    public List<YeastDTO> getYeast() {
        return List.of();
    }

    @Override
    public List<RecipeDTO> getAllRecipes() {
        return recipeManager.getAllRecipes();
    }

    @Override
    public void addViewedRecipe(int recipeId) {

    }

    @Override
    public int addNewRecipe(RecipeDTO recipe) {
        Recipe newRecipe = recipeManager.addRecipe(recipe);
        return newRecipe.getRecipeId();
    }

    @Override
    public void brewRecipe(int recipeId, String userId) {
        brewingManager.addRecipeToBrew(recipeId, userId);
    }

    @Override
    public void markBrewingAsFinished(String deviceSerialNumber) {
        String userId = deviceManager.getUser(deviceSerialNumber);
        brewingManager.markHeadOfQueueAsBrewedInQueue(userId);
    }

    @Override
    public void addBrewingReport(String deviceId, BrewingReportDTO report) {
        String userId = deviceManager.getUser(deviceId);
        brewingManager.getBrewInQueue(userId).addBrewingReport(report);
    }

    @Override
    public List<BrewingReportDTO> getBrewingReport(String userId, int brewId) {
        return brewingManager.getBrewHistory(userId, brewId);
    }

    @Override
    public List<String> getBrewingMethods() {
        return Arrays.stream(BrewMethod.values())
                     .map(Enum::toString)
                     .collect(Collectors.toList());
    }

    @Override
    public List<String> getBrewingStyle() {
        return Arrays.stream(BrewStyle.values())
                     .map(Enum::toString)
                     .collect(Collectors.toList());
    }
}
