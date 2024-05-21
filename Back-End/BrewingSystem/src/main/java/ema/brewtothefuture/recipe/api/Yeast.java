package ema.brewtothefuture.recipe.api;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.dto.front.YeastDTO;

public class Yeast implements DTOConvertible<YeastDTO> {
    private final int id;
    private double temperatureCelsius;

    public Yeast(int id) {
        this.id = id;
    }

    public Yeast(YeastDTO dto) {
        this.id = dto.id();
        this.temperatureCelsius = dto.temperature_celsius();
    }

    public int getId() {
        return id;
    }

    public double getTemperature_celsius() {
        return temperatureCelsius;
    }

    public void setTemperature_celsius(double temperature) {
        this.temperatureCelsius = temperature;
    }

    @Override
    public YeastDTO convertToDTO() {
        return new YeastDTO(
                id,
                temperatureCelsius
        );
    }
}
