package ema.brewtothefuture.db.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "brewing_report")
public class BrewingReportDB {
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
}
