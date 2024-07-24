package ema.brewtothefuture.model.recipe.api;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.HopDTO;

public class Hop implements DTOConvertible<HopDTO> {
    private final long   id;
    private       double amountG;
    private       int    timeToBrewMinutes;

    public Hop(int id) {
        this.id = id;
    }

    public Hop(HopDTO dto) {
        this.id = dto.id();
        this.amountG = dto.amount_g();
        this.timeToBrewMinutes = dto.time_minutes();
    }

    public long getId() {
        return id;
    }

    public double getAmountG() {
        return amountG;
    }

    public void setAmountG(double amountG) {
        this.amountG = amountG;
    }

    public int getTimeToBrewMinutes() {
        return timeToBrewMinutes;
    }

    public void setTimeToBrewMinutes(int timeToBrewMinutes) {
        this.timeToBrewMinutes = timeToBrewMinutes;
    }

    @Override
    public HopDTO convertToDTO() {
        return new HopDTO(id, amountG, timeToBrewMinutes);
    }
}
