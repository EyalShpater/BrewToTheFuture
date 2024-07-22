package ema.brewtothefuture.db.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recipe_ingredient")
public class RecipeIngredientDB {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private double amount;
    private String unit;
    private double portion;
    @OneToOne
    @JoinColumn(name = "ingredient_id")
    private IngredientDB ingredientDB;
    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeDB recipeDB;
}
