package ema.brewtothefuture.system.impl;

import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.FermentableDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.dto.front.YeastDTO;
import ema.brewtothefuture.recipe.api.Hop;
import ema.brewtothefuture.system.api.Brewer;

import java.util.List;

public class BrewingSystemImpl implements Brewer {


    @Override
    public EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber) {
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
    public void brewRecipe(int recipeId, String userId) {

    }
}
