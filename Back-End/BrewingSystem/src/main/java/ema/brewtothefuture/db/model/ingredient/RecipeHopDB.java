package ema.brewtothefuture.db.model.ingredient;

import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import jakarta.persistence.*;

@Entity
@Table(name = "recipe_hops")
public class RecipeHopDB {
    @Id
    private long   id;
    private double amount_g;
    private int    time_min;

    @ManyToOne
    @JoinColumn(name = "hop_id")
    private HopDB hopDB;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeDB recipeDB;
}
