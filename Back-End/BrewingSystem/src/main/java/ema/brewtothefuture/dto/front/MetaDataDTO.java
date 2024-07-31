package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public record MetaDataDTO (
        String user_id,
        String recipe_name,
        String method,
        String style,
        double abv,
        double ibu,
        double original_gravity,
        double final_gravity,
        double color,
        int batch_size_liter,
        long time_created
) implements DTO { }
