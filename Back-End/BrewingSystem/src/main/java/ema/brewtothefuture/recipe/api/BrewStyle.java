package ema.brewtothefuture.recipe.api;

public enum BrewStyle {
    PALE_ALE("Pale Ale"),
    IPA("India Pale Ale"),
    AMBER_ALE("Amber Ale"),
    BROWN_ALE("Brown Ale"),
    STOUT("Stout"),
    PORTER("Porter"),
    WHEAT_BEER("Wheat Beer"),
    PILSNER("Pilsner"),
    LAGER("Lager"),
    HEFEWEIZEN("Hefeweizen"),
    // Additional Styles
    AMERICAN_PALE_ALE("American Pale Ale"),
    AMERICAN_IPA("American IPA"),
    ENGLISH_PALE_ALE("English Pale Ale"),
    ENGLISH_IPA("English IPA"),
    AMERICAN_WHEAT_ALE("American Wheat Ale"),
    WITBIER("Witbier"),
    KOLSCH("Kölsch"),
    DORTMUNDER_EXPORT("Dortmunder Export"),
    HELLES("Helles"),
    VIENNA_LAGER("Vienna Lager");

    private final String styleName;

    BrewStyle(String style) {
        this.styleName = style;
    }

    public static BrewStyle fromString(String name) {
        for (BrewStyle style : BrewStyle.values()) {
            if (style.styleName.equalsIgnoreCase(name)) {
                return style;
            }
        }

        throw new IllegalArgumentException("No BrewMethod with name " + name + " found");
    }

    @Override
    public String toString() {
        return styleName;
    }
}
