package ema.brewtothefuture.db.model.ingredient;

import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.HopDTO;
import ema.brewtothefuture.model.recipe.api.Hop;
import jakarta.persistence.*;

@Entity
@Table(name = "recipe_hops")
public class RecipeHopDB implements DTOConvertible<HopDTO> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long   id;
    private double amount_g;
    private int    time_min;

    @ManyToOne
    @JoinColumn(name = "hop_id")
    private HopDB hopDB;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeDB recipeDB;

    public RecipeHopDB(long hop_id, double amount_g, int time_min) {
        this.hopDB = new HopDB(hop_id);
        this.amount_g = amount_g;
        this.time_min = time_min;
    }

    public RecipeHopDB(Hop hop, HopDB hopDB, RecipeDB recipeDB) {
        this(hop.getId(), hop.getAmountG(), hop.getTimeToBrewMinutes());
        this.hopDB = hopDB;
        this.recipeDB = recipeDB;
    }

    public RecipeHopDB() {
    }

    public long getId() {
        return id;
    }

    public double getAmountGrams() {
        return amount_g;
    }

    public int getTimeToBrewMinutes() {
        return time_min;
    }

    @Override
    public HopDTO convertToDTO() {
        return new HopDTO(hopDB.getId(), amount_g, time_min);
    }
}
