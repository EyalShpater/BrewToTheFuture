package ema.brewtothefuture.recipe.impl;

import ema.brewtothefuture.dto.front.RecipeDTO;

import java.util.*;

public class RecipeManager {
    private Map<Integer, Recipe> recipes;
    private static int id = 1;
    private static RecipeManager instance;

    private RecipeManager() {
        recipes = new HashMap<>();
    }

    public static RecipeManager getInstance() {
        if (instance == null) {
            instance = new RecipeManager();
        }

        return instance;
    }

    public Recipe addRecipe(RecipeDTO recipe) {
        Recipe newRecipe= new Recipe(recipe, id++);
        recipes.put(newRecipe.getRecipeId(), newRecipe);

        return newRecipe;
    }

    public Recipe getRecipe(int recipeId) {
        return recipes.get(recipeId);
    }

    public List<RecipeDTO> getAllRecipes() {
        List<RecipeDTO> recipeDTOs = new ArrayList<>();
        for (Recipe recipe : recipes.values()) {
            recipeDTOs.add(recipe.convertToDTO());
        }

        return recipeDTOs;
    }
}
