package ema.brewtothefuture.db.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "ingredient")
public class IngredientDB {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long                     id;
    private String                   name;
    private double                   ibu;
    private String                   type;

    @OneToOne(mappedBy = "ingredientDB")
    private RecipeIngredientDB recipeIngredient;
}
