package ema.brewtothefuture.heat.unit.impl;

import ema.brewtothefuture.heat.unit.api.BrewingSystem;
import ema.brewtothefuture.recipe.impl.Recipe;

public class BrewingSystemImpl implements BrewingSystem {
    private final String id;


    public BrewingSystemImpl(String id) {
        this.id = id;
    }

    @Override
    public void Brew(Recipe recipe) {

    }

    @Override
    public void Stop() {

    }
}
