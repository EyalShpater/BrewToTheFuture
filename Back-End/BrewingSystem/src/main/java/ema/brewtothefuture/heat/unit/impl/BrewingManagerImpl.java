package ema.brewtothefuture.heat.unit.impl;

import ema.brewtothefuture.heat.unit.api.Brew;
import ema.brewtothefuture.heat.unit.api.BrewingManager;
import ema.brewtothefuture.recipe.impl.Recipe;
import ema.brewtothefuture.recipe.impl.RecipeManager;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class BrewingManagerImpl implements BrewingManager {
    private static int                      id            = 1;
    private final  RecipeManager            recipeManager = RecipeManager.getInstance();
    private final  Map<String, Stack<Brew>> userIdToBrew  = new HashMap<>();

    @Override
    public Brew brewRecipe(String userId) {
        Recipe toBrew = getRecipe(userId);
        return (toBrew == null) ? null : addBrew(userId, toBrew);
    }

    @Override
    public Brew getBrew(String userId) {
        Stack<Brew> stack = userIdToBrew.get(userId);
        return (stack == null || stack.empty()) ? null : stack.peek();
    }

    @Override
    public void stopRecipe(int recipeId) {

    }

    @Override
    public Recipe getRecipe(String userId) {
        Stack<Brew> brews = userIdToBrew.get(userId);
        return (brews == null || brews.empty()) ? null : brews.peek().getRecipe();
    }

    private Brew addBrew(String userId, Recipe recipe) {
        Brew newBrew = new BrewImpl(id++, userId, recipe);
        userIdToBrew.computeIfAbsent(userId, k -> new Stack<>()).push(newBrew);

        return newBrew;
    }

    @Override
    public void addRecipeToBrew(int recipeId, String userId) {
        Recipe recipe = recipeManager.getRecipe(recipeId);
        addBrew(userId, recipe);
    }

    @Override
    public void markBrewed(String userId) {
        userIdToBrew.get(userId).pop();
    }
}


