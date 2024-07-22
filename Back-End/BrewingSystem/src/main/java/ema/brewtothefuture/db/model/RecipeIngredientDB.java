package ema.brewtothefuture.db.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipe_ingredient")
public class RecipeIngredientDB {
    /*
    CREATE TABLE RecipeIngredient (
    recipe_id INTEGER REFERENCES Recipes(id),
    ingredient_id INTEGER REFERENCES Ingredient(id),
    amount FLOAT,
    unit VARCHAR(50),
    portion FLOAT,
    PRIMARY KEY (recipe_id, ingredient_id)
);

     */

    @Id
    private long recipe_id;
//    @Id
    private long ingredient_id;
    private double amount;
    private String unit;
    private double portion;
}
