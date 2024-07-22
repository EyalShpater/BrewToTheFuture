package ema.brewtothefuture.db.model;

import ema.brewtothefuture.db.model.converter.CombinedStepsNotifications;
import ema.brewtothefuture.db.model.converter.StepsAndNotificationsConverter;
import ema.brewtothefuture.dto.front.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "recipe")
public class RecipeDB {
    @Id
    private int recipe_id;
    private String user_id;
    private String recipe_name;
    private String method;
    private String style;
    private double abv;
    private double ibu;
    private double original_gravity;
    private double final_gravity;
    private double color;
    private int batch_size_liter;
    @Convert(converter = StepsAndNotificationsConverter.class)
    @Column(name = "recipe_json", columnDefinition = "jsonb")
    private CombinedStepsNotifications recipe;
    private double rating;
    private int votes;
    private int views;
}
