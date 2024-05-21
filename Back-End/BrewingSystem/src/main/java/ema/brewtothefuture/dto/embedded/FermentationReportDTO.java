package ema.brewtothefuture.dto.embedded;

public record FermentationReportDTO(
        int brew_id, String user_id,
        long timestamp,
        double temperature_celsius,
        double relative_humidity
) { }
