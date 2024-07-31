package ema.brewtothefuture.db.model.ingredient;

import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.YeastDTO;
import ema.brewtothefuture.model.recipe.api.Yeast;
import jakarta.persistence.*;

@Entity
@Table(name = "recipe_yeast")
public class RecipeYeastDB implements DTOConvertible<YeastDTO> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long   id;
    private double temperature_celsius;

    @ManyToOne
    @JoinColumn(name = "yeast_id")
    private YeastDB yeastDB;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeDB recipeDB;

    public RecipeYeastDB(long id, double temperature_celsius) {
        this.yeastDB = new YeastDB(id);
        this.temperature_celsius = temperature_celsius;
    }

    public RecipeYeastDB(Yeast yeast, YeastDB yeastDB, RecipeDB recipeDB) {
        this(yeast.getId(), yeast.getTemperature_celsius());
        this.yeastDB = yeastDB;
        this.recipeDB = recipeDB;
    }

    public RecipeYeastDB() {
    }

    public long getId() {
        return id;
    }

    public double getTemperatureCelsius() {
        return temperature_celsius;
    }

    @Override
    public YeastDTO convertToDTO() {
        return new YeastDTO(yeastDB.getId(), temperature_celsius);
    }
}
