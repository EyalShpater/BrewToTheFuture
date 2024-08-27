package ema.brewtothefuture.db.model;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.embedded.FermentationReportDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "fermentation_report")
public class FermentationReportDB implements DTOConvertible<FermentationReportDTO> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long   id;
    @ManyToOne
    @JoinColumn(name = "brew_id")
    private BrewDB brew;
    private String user_id;
    private long   timestamp;
    private double temperature_celsius;
    private double relative_humidity;
    private int    status_code;
    private String error_message;

    public FermentationReportDB() {
    }

    public FermentationReportDB(FermentationReportDTO dto, BrewDB brew) {
        this.brew = brew;
        this.user_id = dto.user_id();
        this.timestamp = dto.timestamp();
        this.temperature_celsius = dto.temperature_celsius();
        this.relative_humidity = dto.relative_humidity();
        this.status_code = dto.status_code();
        this.error_message = dto.error_message();
    }

    @Override
    public FermentationReportDTO convertToDTO() {
        return new FermentationReportDTO(
                brew.getId(),
                user_id,
                timestamp,
                temperature_celsius,
                relative_humidity,
                status_code,
                error_message
        );
    }
}
