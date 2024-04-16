package ema.brewtothefuture.recipe.api.unit;

public enum TemperatureUnitType implements UnitType{
    DegreeCelsius("degree Celsius", "°C"),
    DegreeFahrenheit("degree Fahrenheit", "°F");

    private final String name;
    private final String abbreviation;

    TemperatureUnitType(String name, String abbreviation) {
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
