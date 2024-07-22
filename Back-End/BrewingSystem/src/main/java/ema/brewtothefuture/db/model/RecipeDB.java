package ema.brewtothefuture.db.model;

import ema.brewtothefuture.db.model.converter.CombinedStepsNotifications;
import ema.brewtothefuture.db.model.converter.StepsAndNotificationsConverter;
import ema.brewtothefuture.dto.front.*;
import ema.brewtothefuture.model.recipe.api.MetaData;
import ema.brewtothefuture.model.recipe.impl.Recipe;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.lang.annotation.ElementType;
import java.util.List;

@Entity
@Table(name = "recipe")
public class RecipeDB {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int recipe_id;
    private String user_id;
    private String recipe_name;
    private String method;
    private String style;
    private double abv;
    private double ibu;
    private double original_gravity;
    private double final_gravity;
    private double color;
    private int batch_size_liter;
    @Convert(converter = StepsAndNotificationsConverter.class)
    @Column(name = "recipe_json", columnDefinition = "text")
    private CombinedStepsNotifications recipe;
    private double rating;
    private int votes;
    private int views;
    @OneToMany(mappedBy = "recipeDB")
    private List<RecipeIngredientDB> ingredients;
    @OneToMany(mappedBy = "recipe")
    private List<BrewDB> brew;

    public RecipeDB() {
    }

    public RecipeDB(Recipe recipe) {
        MetaData metaData = recipe.getMetaData();
//        this.recipe_id = recipe.getRecipeId();
        this.user_id = metaData.authorId();
        this.recipe_name = metaData.name();
        this.method = metaData.method().toString();
        this.style = metaData.style().toString();
        this.abv = metaData.abv();
        this.ibu = metaData.ibu();
        this.original_gravity = metaData.originalGravity();
        this.final_gravity = metaData.finalGravity();
        this.color = metaData.color();
        this.batch_size_liter = 0;
        this.recipe = new CombinedStepsNotifications(recipe.getSteps(), recipe.getNotifications());
    }
}
