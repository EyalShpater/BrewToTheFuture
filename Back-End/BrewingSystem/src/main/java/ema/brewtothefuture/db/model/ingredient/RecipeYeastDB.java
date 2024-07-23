package ema.brewtothefuture.db.model.ingredient;

import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import jakarta.persistence.*;

@Entity
@Table(name = "recipe_yeast")
public class RecipeYeastDB {
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
}
