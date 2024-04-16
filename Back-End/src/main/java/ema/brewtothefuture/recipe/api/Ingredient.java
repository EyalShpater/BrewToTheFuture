package ema.brewtothefuture.recipe.api;

import ema.brewtothefuture.recipe.api.unit.SizeUnitType;

public class Ingredient {
    private final String name;
    private double quantity;
    private SizeUnitType sizeUnitType;

    public Ingredient(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public double getQuantity() {
        return quantity;
    }

    public SizeUnitType getUnitType() {
        return sizeUnitType;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public void setUnitType(SizeUnitType unitType) {
        this.sizeUnitType = unitType;
    }
}
