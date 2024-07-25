package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public record YeastDTO(long id, double temperature_celsius) implements DTO {
}
