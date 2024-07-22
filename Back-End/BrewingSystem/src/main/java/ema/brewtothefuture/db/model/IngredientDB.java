package ema.brewtothefuture.db.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredient")
public class IngredientDB {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long   id;
    private String name;
    private double ibu;
    private String type;

    @OneToOne(mappedBy = "ingredientDB")
    private RecipeIngredientDB recipeIngredient;

    public static String TypeHop   = "Hop";
    public static String TypeFermentable = "Fermentable";
    public static String TypeYeast = "Yeast";

    public IngredientDB(String name, String type) {
        this.type = type;
        this.name = name;
    }

    public IngredientDB() {
    }

    public String getName() {
        return name;
    }
}
