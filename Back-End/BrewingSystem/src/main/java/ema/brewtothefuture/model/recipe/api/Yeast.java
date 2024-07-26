package ema.brewtothefuture.model.recipe.api;

import ema.brewtothefuture.db.model.ingredient.RecipeYeastDB;
import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.YeastDTO;

public class Yeast implements DTOConvertible<YeastDTO> {
    private final long id;
    private double temperatureCelsius;

    public Yeast(int id) {
        this.id = id;
    }

    public Yeast(YeastDTO dto) {
        this.id = dto.id();
        this.temperatureCelsius = dto.temperature_celsius();
    }

    public Yeast(RecipeYeastDB yeastDB) {
        this.id = yeastDB.getId();
        this.temperatureCelsius = yeastDB.getTemperatureCelsius();
    }

    public long getId() {
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
