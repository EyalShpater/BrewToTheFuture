package ema.brewtothefuture.db.model.ingredient.data;

import ema.brewtothefuture.db.model.ingredient.RecipeYeastDB;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "yeasts")
public class YeastDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long   id;
    private String name;
    private String laboratory;
    private String type;
    private String alcoholTolerance;
    private String flocculation;
    private String attenuation;
    private String minTemp;
    private String maxTemp;

    @OneToMany(mappedBy = "yeastDB")
    private List<RecipeYeastDB> recipeYeastDB;

    public YeastDB(String name, String laboratory, String type, String alcoholTolerance, String flocculation,
                   String attenuation, String minTemp, String maxTemp) {
        this.name = name;
        this.laboratory = laboratory;
        this.type = type;
        this.alcoholTolerance = alcoholTolerance;
        this.flocculation = flocculation;
        this.attenuation = attenuation;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
    }

    public YeastDB(long id) {
        this.id = id;
    }

    public YeastDB() {
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLaboratory() {
        return laboratory;
    }

    public String getType() {
        return type;
    }

    public String getAlcoholTolerance() {
        return alcoholTolerance;
    }

    public String getFlocculation() {
        return flocculation;
    }

    public String getAttenuation() {
        return attenuation;
    }

    public String getMinTemp() {
        return minTemp;
    }

    public String getMaxTemp() {
        return maxTemp;
    }
}
