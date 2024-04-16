package ema.brewtothefuture.recipe.api;

import ema.brewtothefuture.recipe.api.unit.TemperatureUnitType;

public record Temperature(double value, TemperatureUnitType unit) {
}
