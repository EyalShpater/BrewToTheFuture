package ema.brewtothefuture.model.recipe.api;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.MetaDataDTO;

public record MetaData(
        String authorId,
        String name,
        BrewMethod method,
        BrewStyle style,
        double abv,
        double ibu,
        double originalGravity,
        double finalGravity,
        double color,
        int batchSize,
        long timeCreated
) implements DTOConvertible<MetaDataDTO> {

    public MetaData(String authorId) {
        this(authorId,
             "",
             BrewMethod.ALL_GRAIN,
             BrewStyle.IPA,
             0,
             0,
             0,
             0,
             0,
             0,
             System.currentTimeMillis());
    }

    public MetaData(MetaDataDTO dto) {
        this(
                dto.user_id(),
                dto.recipe_name(),
                BrewMethod.valueOf(dto.method()),
                BrewStyle.valueOf(dto.style()),
                dto.abv(),
                dto.ibu(),
                dto.original_gravity(),
                dto.final_gravity(),
                dto.color(),
                dto.batch_size_liter(),
                dto.time_created()
            );
    }

    @Override
    public MetaDataDTO convertToDTO() {
        return new MetaDataDTO(
                authorId,
                name,
                method.name(),
                style.name(),
                abv,
                ibu,
                originalGravity,
                finalGravity,
                color,
                batchSize,
                timeCreated
        );
    }
}
