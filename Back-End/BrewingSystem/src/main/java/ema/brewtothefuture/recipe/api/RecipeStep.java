package ema.brewtothefuture.recipe.api;

public class RecipeStep {
    private final StepType type;
    private double durationInMinutes;
    private Temperature targetTemperature;

    public RecipeStep(StepType type) {
        this.type = type;
    }

    public StepType getType() {
        return type;
    }

}
