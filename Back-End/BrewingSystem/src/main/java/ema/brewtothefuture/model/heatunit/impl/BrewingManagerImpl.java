package ema.brewtothefuture.model.heatunit.impl;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.model.heatunit.api.Brew;
import ema.brewtothefuture.model.heatunit.api.BrewingManager;
import ema.brewtothefuture.model.recipe.impl.Recipe;
import ema.brewtothefuture.model.recipe.impl.RecipeManager;

import java.util.*;

public class BrewingManagerImpl implements BrewingManager {
    private static int                             id                  = 1;
    private final  RecipeManager                   recipeManager       = RecipeManager.getInstance();
    private final  Map<String, Map<Integer, Brew>> userIdToBrewHistory = new HashMap<>();
    private final  Map<String, Queue<Brew>>        userIdToBrew        = new HashMap<>();

    @Override
    public Brew brewRecipeInQueue(String userId) {
        Recipe toBrew = getRecipeInQueue(userId);

        return (toBrew == null) ?
                null :
                addBrew(userId, toBrew);
    }

    @Override
    public Brew getBrewInQueue(String userId) {
        Queue<Brew> queue = userIdToBrew.get(userId);

        return (queue == null || queue.isEmpty()) ?
                null :
                queue.peek();
    }

    @Override
    public void stopRecipeInQueue(int recipeId) {

    }

    @Override
    public Recipe getRecipeInQueue(String userId) {
        Queue<Brew> brews = userIdToBrew.get(userId);

        return (brews == null || brews.isEmpty()) ?
                null :
                brews.peek().getRecipe();
    }

    private Brew addBrew(String userId, Recipe recipe) {
        Brew newBrew = new BrewImpl(id++, userId, recipe);
        userIdToBrew.computeIfAbsent(userId, k -> new LinkedList<>()).add(newBrew);
        userIdToBrewHistory.computeIfAbsent(userId, k -> new HashMap<>())
                           .put(newBrew.getBrewId(), newBrew);

        return newBrew;
    }

    @Override
    public void addRecipeToBrew(int recipeId, String userId) {
        Recipe recipe = Optional.ofNullable(recipeManager.getRecipe(recipeId))
                                .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));
        addBrew(userId, recipe);
    }

    @Override
    public void markHeadOfQueueAsBrewedInQueue(String userId) {
        try {
            Brew brewed = userIdToBrew.get(userId).remove();

            userIdToBrewHistory.computeIfAbsent(userId, k -> new HashMap<>())
                               .put(brewed.getBrewId(), brewed);
        } catch (NoSuchElementException e) {
            throw new IllegalArgumentException("No brews for user " + userId);
        }
    }

    @Override
    public List<BrewingReportDTO> getBrewHistory(String userId, int brewId) {
        Map<Integer, Brew> brewHistory = userIdToBrewHistory.get(userId);

        if (brewHistory == null) {
            throw new IllegalArgumentException("User ID: '" + userId + "' does not exist");
        }

        Brew brew = brewHistory.get(brewId);
        if (brew == null) {
            throw new IllegalArgumentException("Brew ID: '" + brewId + "' does not exist");
        }

        return Collections.unmodifiableList(brew.getReports());
    }
}


