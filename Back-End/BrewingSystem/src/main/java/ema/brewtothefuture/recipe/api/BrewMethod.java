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

    public static BrewMethod fromString(String name) {
        for (BrewMethod method : BrewMethod.values()) {
            if (method.name.equalsIgnoreCase(name)) {
                return method;
            }
        }

        throw new IllegalArgumentException("No BrewMethod with name " + name + " found");
    }
}
