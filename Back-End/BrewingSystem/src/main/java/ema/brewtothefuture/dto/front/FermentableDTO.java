package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public record FermentableDTO(
        int id,
        double amount_kg
) implements DTO {}
