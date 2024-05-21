package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public record YeastDTO(int id, double temperature_celsius) implements DTO {
}
