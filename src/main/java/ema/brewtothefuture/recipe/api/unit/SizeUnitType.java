package ema.brewtothefuture.recipe.api.unit;

public enum SizeUnitType implements UnitType{
    GRAM("gram", "g"),
    KILOGRAM("kilogram", "kg"),
    LITER("liter", "l"),
    MILLILITER("milliliter", "ml"),
    OZ("ounce", "oz"),
    Gallon("gallon", "gal"),
    POUND("pound", "lb");

    private final String name;
    private final String abbreviation;

    SizeUnitType(String name, String abbreviation) {
        this.name = name;
        this.abbreviation = abbreviation;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getAbbreviation() {
        return abbreviation;
    }
}
