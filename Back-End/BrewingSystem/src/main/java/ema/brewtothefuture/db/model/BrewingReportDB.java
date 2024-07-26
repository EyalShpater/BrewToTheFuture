package ema.brewtothefuture.db.model;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "brewing_report")
public class BrewingReportDB implements DTOConvertible<BrewingReportDTO> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    @JoinColumn(name = "brew_id")
    private BrewDB brew;
    private String user_id;
    private long   timestamp;
    private double temperature_celsius;
    private int current_step;
    private long step_start_time;
    private int status_code;
    private String error_message;

    public BrewingReportDB(BrewingReportDTO dto, BrewDB brew) {
        this.brew = brew;
        this.user_id = dto.user_id();
        this.timestamp = dto.timestamp();
        this.temperature_celsius = dto.temperature_celsius();
        this.current_step = dto.current_step();
        this.step_start_time = dto.step_start_time();
        this.status_code = dto.status_code();
        this.error_message = dto.error_message();
    }

    public BrewingReportDB() {
    }

    @Override
    public BrewingReportDTO convertToDTO() {
        return new BrewingReportDTO(
                brew.getId(),
                user_id,
                timestamp,
                temperature_celsius,
                current_step,
                step_start_time,
                status_code,
                error_message
        );
    }
}
