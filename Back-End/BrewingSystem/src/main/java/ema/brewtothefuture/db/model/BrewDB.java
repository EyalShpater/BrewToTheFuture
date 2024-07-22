package ema.brewtothefuture.db.model;

import jakarta.persistence.*;

@Entity
@Table(name = "brew")
public class BrewDB {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @JoinColumn(name = "recipe_id")
    private int recipe_id;
    private int user_id;
}
