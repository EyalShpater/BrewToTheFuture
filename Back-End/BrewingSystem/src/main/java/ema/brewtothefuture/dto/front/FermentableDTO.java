package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public record FermentableDTO(
        long id,
        double amount_kg
) implements DTO {}
