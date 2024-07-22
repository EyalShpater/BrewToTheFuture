package ema.brewtothefuture.db.model;

import jakarta.persistence.*;

@Entity
@Table(name = "style")
public class StyleDB {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;

    public StyleDB(String name) {
        this.name = name;
    }

    public StyleDB() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
