package ema.brewtothefuture.recipe.impl;

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

    public void addRecipe(Recipe recipe) {
        recipes.put(id++, recipe);
    }
}
