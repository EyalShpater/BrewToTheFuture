package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public record HopDTO(
        int id,
        double amount_g,
        int time_minutes
) implements DTO { }
