package ema.brewtothefuture.dto.embedded;

public record FermentationReportDTO(
        long brew_id, String user_id,
        long timestamp,
        double temperature_celsius,
        double relative_humidity,
        int status_code,
        String error_message
) { }
