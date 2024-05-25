package ema.brewtothefuture.heat.unit.impl;

import ema.brewtothefuture.heat.unit.api.Brew;
import ema.brewtothefuture.heat.unit.api.BrewingManager;
import ema.brewtothefuture.recipe.impl.Recipe;
import ema.brewtothefuture.recipe.impl.RecipeManager;

import java.util.*;

public class BrewingManagerImpl implements BrewingManager {
    private static int                      id            = 1;
    private final  RecipeManager            recipeManager = RecipeManager.getInstance();
    private final  Map<String, Queue<Brew>> userIdToBrew  = new HashMap<>();

    @Override
    public Brew brewRecipe(String userId) {
        Recipe toBrew = getRecipe(userId);
        return (toBrew == null) ?
                null :
                addBrew(userId, toBrew);
    }

    @Override
    public Brew getBrew(String userId) {
        Queue<Brew> queue = userIdToBrew.get(userId);
        return (queue == null || queue.isEmpty()) ?
                null :
                queue.peek();
    }

    @Override
    public void stopRecipe(int recipeId) {

    }

    @Override
    public Recipe getRecipe(String userId) {
        Queue<Brew> brews = userIdToBrew.get(userId);
        return (brews == null || brews.isEmpty()) ?
                null :
                brews.peek().getRecipe();
    }

    private Brew addBrew(String userId, Recipe recipe) {
        Brew newBrew = new BrewImpl(id++, userId, recipe);
        userIdToBrew.computeIfAbsent(userId, k -> new LinkedList<>()).add(newBrew);

        return newBrew;
    }

    @Override
    public void addRecipeToBrew(int recipeId, String userId) {
        Recipe recipe = Optional.ofNullable(recipeManager.getRecipe(recipeId))
                                .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));
        addBrew(userId, recipe);
    }

    @Override
    public void markBrewed(String userId) {
        userIdToBrew.get(userId).remove();
    }
}


