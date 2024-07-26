package ema.brewtothefuture.db.model;

import ema.brewtothefuture.db.model.converter.CombinedStepsNotifications;
import ema.brewtothefuture.db.model.converter.StepsAndNotificationsConverter;
import ema.brewtothefuture.db.model.ingredient.RecipeFermentableDB;
import ema.brewtothefuture.db.model.ingredient.RecipeHopDB;
import ema.brewtothefuture.db.model.ingredient.RecipeYeastDB;
import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.model.recipe.api.MetaData;
import ema.brewtothefuture.model.recipe.api.Notification;
import ema.brewtothefuture.model.recipe.api.RecipeStep;
import ema.brewtothefuture.model.recipe.impl.Recipe;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "recipe")
public class RecipeDB implements DTOConvertible<RecipeDTO> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int                       recipe_id;
    private String                    user_id;
    private String                    recipe_name;
    private String                    method;
    private String                    style;
    private double                    abv;
    private double                    ibu;
    private double                    original_gravity;
    private double                    final_gravity;
    private double                    color;
    private int                       batch_size_liter;
    @Convert(converter = StepsAndNotificationsConverter.class)
    @Column(name = "recipe_json", columnDefinition = "text")
    private CombinedStepsNotifications recipe;
    private double                    rating;
    private int                       votes;
    private int                       views;
    @OneToMany(mappedBy = "recipeDB")
    private List<RecipeFermentableDB> fermentables;
    @OneToMany(mappedBy = "recipeDB")
    private List<RecipeHopDB>         hops;
    @OneToMany(mappedBy = "recipeDB")
    private List<RecipeYeastDB>       yeasts;
    @OneToMany(mappedBy = "recipe")
    private List<BrewDB>              brew;

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

    public RecipeDB(RecipeDTO recipe) {
        List<RecipeStep> steps = recipe.recipe()
                                       .stream()
                                       .map(RecipeStep::new)
                                       .toList();
        List<Notification> notifications = recipe.notifications()
                                                 .stream()
                                                 .map(Notification::new)
                                                 .toList();
        this.recipe_name = recipe.recipe_name();
        this.method = recipe.method();
        this.style = recipe.style();
        this.abv = recipe.abv();
        this.ibu = recipe.ibu();
        this.original_gravity = recipe.original_gravity();
        this.final_gravity = recipe.final_gravity();
        this.color = recipe.color();
        this.batch_size_liter = recipe.batch_size_liter();
        this.recipe = new CombinedStepsNotifications(steps, notifications);
    }

    public void setYeasts(List<RecipeYeastDB> yeasts) {
        this.yeasts = yeasts;
    }

    public void setHops(List<RecipeHopDB> hops) {
        this.hops = hops;
    }

    public void setFermentables(List<RecipeFermentableDB> fermentables) {
        this.fermentables = fermentables;
    }

    @Override
    public RecipeDTO convertToDTO() {
        return new RecipeDTO(
                user_id,
                recipe_id,
                recipe_name,
                method,
                style,
                abv,
                ibu,
                original_gravity,
                final_gravity,
                color,
                batch_size_liter,
                recipe.getSteps()
                      .stream()
                      .map(RecipeStep::convertToFrontDTO)
                      .toList(),
                recipe.getNotifications()
                      .stream()
                      .map(Notification::convertToDTO)
                      .toList(),
                null,
                null,
                null
        );
    }

    public List<RecipeFermentableDB> getFermentables() {
        return fermentables;
    }

    public List<RecipeHopDB> getHops() {
        return hops;
    }

    public List<RecipeYeastDB> getYeasts() {
        return yeasts;
    }

    public int getId() { return recipe_id; }

    public String getUserID() {
        return user_id;
    }

    public String getRecipeName() {
        return recipe_name;
    }

    public String getMethod() {
        return method;
    }

    public String getStyle() {
        return style;
    }

    public double getAbv() {
        return abv;
    }

    public double getIbu() {
        return ibu;
    }

    public double getOriginalGravity() {
        return original_gravity;
    }

    public double getFinalGravity() {
        return final_gravity;
    }

    public double getColor() {
        return color;
    }

    public int getBatchSizeLiter() {
        return batch_size_liter;
    }

    public double getRating() {
        return rating;
    }

    public int getVotes() {
        return votes;
    }

    public int getViews() {
        return views;
    }

    public List<RecipeStep> getSteps() {
        return recipe.getSteps();
    }

    public List<Notification> getNotifications() {
        return recipe.getNotifications();
    }
}
