package ema.brewtothefuture.db.model.ingredient;

import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import jakarta.persistence.*;

@Entity
@Table(name = "recipe_fermentable")
public class RecipeFermentableDB {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long   id;
    private double amount_kg;

    @ManyToOne
    @JoinColumn(name = "fermentable_id")
    private FermentableDB fermentableDB;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeDB recipeDB;
}
