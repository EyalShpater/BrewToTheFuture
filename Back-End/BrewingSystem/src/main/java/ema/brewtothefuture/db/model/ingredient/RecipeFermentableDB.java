package ema.brewtothefuture.db.model.ingredient;

import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.FermentableDTO;
import ema.brewtothefuture.model.recipe.api.Fermentable;
import jakarta.persistence.*;

@Entity
@Table(name = "recipe_fermentable")
public class RecipeFermentableDB implements DTOConvertible<FermentableDTO> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private double amount_kg;

    @ManyToOne
    @JoinColumn(name = "fermentable_id")
    private FermentableDB fermentableDB;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeDB recipeDB;

    public RecipeFermentableDB(long id, double amount_kg) {
        this.amount_kg = amount_kg;
        this.fermentableDB = new FermentableDB(id);
    }

    public RecipeFermentableDB(Fermentable fermentable, FermentableDB fermentableDB, RecipeDB recipeDB) {
        this(fermentable.getId(), fermentable.getAmountKG());
        this.fermentableDB = fermentableDB;
        this.recipeDB = recipeDB;
    }

    public RecipeFermentableDB() {
    }

    public long getId() {
        return id;
    }

    public double getAmountKG() {
        return amount_kg;
    }

    @Override
    public FermentableDTO convertToDTO() {
        return new FermentableDTO(id, amount_kg);
    }
}
