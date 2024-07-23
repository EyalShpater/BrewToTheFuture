package ema.brewtothefuture.db.model.ingredient.data;

import ema.brewtothefuture.db.model.ingredient.RecipeHopDB;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "hops")
public class HopDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long   id;
    private String name;
    private String Type;
    @Column(name = "average_AA")
    private double averageAA;
    private String use;

    @OneToMany(mappedBy = "hopDB")
    private List<RecipeHopDB> recipeHopDB;

    public HopDB(String name, String type, double averageAA, String use) {
        this.name = name;
        Type = type;
        this.averageAA = averageAA;
        this.use = use;
    }

    public HopDB() {
    }
}
