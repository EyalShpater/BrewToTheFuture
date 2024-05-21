package ema.brewtothefuture.dto.embedded;

import ema.brewtothefuture.dto.api.DTO;

public record BrewStepDTO(
        int step_id,
        double temperature_celsius,
        int duration_minutes,
        boolean approval_required
) implements DTO { }