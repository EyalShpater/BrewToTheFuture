package ema.brewtothefuture.db.model.ingredient.data;

import ema.brewtothefuture.db.model.ingredient.RecipeFermentableDB;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "fermentables")
public class FermentableDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long   id;
    private String name;
    private String country;
    private String category;
    private String type;
    private String color;
    private double ppg;

    @OneToMany(mappedBy = "fermentableDB")
    private List<RecipeFermentableDB> recipeFermentableDB;

    public FermentableDB(String name, String country, String category, String type, String color, double ppg) {
        this.name = name;
        this.country = country;
        this.category = category;
        this.type = type;
        this.color = color;
        this.ppg = ppg;
    }

    public FermentableDB() {
    }
}
