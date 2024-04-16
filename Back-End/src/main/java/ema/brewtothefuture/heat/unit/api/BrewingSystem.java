package ema.brewtothefuture.heat.unit.api;

import ema.brewtothefuture.recipe.impl.Recipe;

public interface BrewingSystem {
    void Brew(Recipe recipe);
    void Stop();
}
