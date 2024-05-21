package ema.brewtothefuture.recipe.api;

public enum BrewMethod {
    ALL_GRAIN("All Grain"),
    BIAB("Brew in a Bag"),
    EXTRACT("Extract"),
    PARTIAL_MASH("Partial Mash");;

    private final String name;

    BrewMethod(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
