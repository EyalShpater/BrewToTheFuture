package ema.brewtothefuture.dto.embedded;

public record BrewingReportDTO(
        long brew_id,
        String user_id,
        long timestamp,
        double temperature_celsius,
        int current_step,
        long step_start_time,
        int status_code,
        String error_message
) { }