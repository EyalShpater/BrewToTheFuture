package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

import java.util.List;

public record RecipeDTO(
        MetaDataDTO meta,
        List<RecipeStepDTO> recipe,
        List<NotificationDTO> notifications,
        List<FermentableDTO> fermentables,
        List<HopDTO> hops,
        List<YeastDTO> yeast
) implements DTO { }