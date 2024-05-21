package ema.brewtothefuture.recipe.api;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.FermentableDTO;

public class Fermentable implements DTOConvertible<FermentableDTO> {
    private final int id;
    private double amountKG;

    public Fermentable(int id) {
        this.id = id;
    }

    public Fermentable(FermentableDTO fermentableDTO) {
        this.id = fermentableDTO.id();
        this.amountKG = fermentableDTO.amount_kg();
    }

    public int getId() {
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
