package ema.brewtothefuture.db.model;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "brew")
public class BrewDB {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
//    private int recipe_id;
    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeDB recipe;
    private int user_id;
    private long start_time;
    @OneToMany(mappedBy = "brew")
    private List<BrewingReportDB> reports;
}
