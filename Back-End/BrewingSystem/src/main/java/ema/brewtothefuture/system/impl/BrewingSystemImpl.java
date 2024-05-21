package ema.brewtothefuture.system.impl;

import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.FermentableDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.dto.front.YeastDTO;
import ema.brewtothefuture.heat.unit.api.BrewingManager;
import ema.brewtothefuture.heat.unit.api.DeviceManager;
import ema.brewtothefuture.heat.unit.impl.BrewingManagerImpl;
import ema.brewtothefuture.heat.unit.impl.DeviceManagerImpl;
import ema.brewtothefuture.recipe.api.Hop;
import ema.brewtothefuture.recipe.impl.Recipe;
import ema.brewtothefuture.recipe.impl.RecipeManager;
import ema.brewtothefuture.system.api.Brewer;

import java.util.List;

public class BrewingSystemImpl implements Brewer {
    RecipeManager recipeManager = RecipeManager.getInstance();
    BrewingManager brewingManager = new BrewingManagerImpl();
    DeviceManager deviceManager = new DeviceManagerImpl();

    @Override
    public EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber) {
        String userId = deviceManager.getUser(deviceSerialNumber);
        Recipe recipe = brewingManager.getRecipe(userId);

//        return recipe.convertToDTO();
        return null;
    }

    @Override
    public void addNewRecipe(RecipeDTO recipe) {

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
    public void addViewedRecipe(int recipeId) {

    }

    @Override
    public void brewRecipe(RecipeDTO recipe, String userId) {
        brewingManager.brewNewRecipe(userId, recipe);
    }
}
