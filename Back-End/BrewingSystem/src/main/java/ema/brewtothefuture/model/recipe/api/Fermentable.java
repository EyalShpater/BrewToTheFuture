package ema.brewtothefuture.model.recipe.api;

import ema.brewtothefuture.db.model.ingredient.RecipeFermentableDB;
import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.FermentableDTO;

public class Fermentable implements DTOConvertible<FermentableDTO> {
    private final long id;
    private double amountKG;

    public Fermentable(long id) {
        this.id = id;
    }

    public Fermentable(FermentableDTO fermentableDTO) {
        this.id = fermentableDTO.id();
        this.amountKG = fermentableDTO.amount_kg();
    }

    public Fermentable(RecipeFermentableDB fermentableDB) {
        this.id = fermentableDB.getId();
        this.amountKG = fermentableDB.getAmountKG();
    }

    public long getId() {
        return id;
    }

    public double getAmountKG() {
        return amountKG;
    }

    public void setAmount(double amount) {
        amountKG = amount;
    }

    @Override
    public FermentableDTO convertToDTO() {
        return new FermentableDTO(id, amountKG);
    }
}
