package ema.brewtothefuture.recipe.impl;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.MetaDataDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.recipe.api.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Recipe implements DTOConvertible<RecipeDTO> {
    private MetaData metaData;
    private List<RecipeStep> steps;
    private List<Notification> notifications;
    private List<Fermentable> fermentables;
    private List<Hop> hops;
    private List<Yeast> yeast;
    private double rating;
    private int votes;
    private int views;

    public Recipe(String id) {
        this.metaData = new MetaData(id);
        this.steps = new ArrayList<>();
        this.notifications = new ArrayList<>();
        this.fermentables = new ArrayList<>();
        this.hops = new ArrayList<>();
        this.yeast = new ArrayList<>();
    }

    public Recipe(RecipeDTO recipeDTO) {
        this.rating = 0;
        this.votes = 0;
        this.views = 0;
        this.metaData = new MetaData(recipeDTO.meta());
        this.steps = recipeDTO.recipe().stream().map(RecipeStep::new).collect(Collectors.toList());
        this.notifications = recipeDTO.notifications().stream().map(Notification::new).collect(Collectors.toList());
        this.fermentables = recipeDTO.fermentables().stream().map(Fermentable::new).collect(Collectors.toList());
        this.hops = recipeDTO.hops().stream().map(Hop::new).collect(Collectors.toList());
        this.yeast = recipeDTO.yeast().stream().map(Yeast::new).collect(Collectors.toList());
    }

    public String getAuthorId() {
        return metaData.authorId();
    }

    public double getRating() {
        return rating;
    }

    public int getVotes() {
        return votes;
    }

    public int getViews() {
        return views;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public void setViews(int views) {
        this.views = views;
    }

    @Override
    public RecipeDTO convertToDTO() {
        return new RecipeDTO(
                new MetaDataDTO(
                        metaData.authorId(),
                        metaData.name(),
                        metaData.method().name(),
                        metaData.style().name(),
                        metaData.abv(),
                        metaData.ibu(),
                        metaData.originalGravity(),
                        metaData.finalGravity(),
                        metaData.color(),
                        metaData.batchSize()
                ),
                steps.stream().map(RecipeStep::convertToDTO).collect(Collectors.toList()),
                notifications.stream().map(Notification::convertToDTO).collect(Collectors.toList()),
                fermentables.stream().map(Fermentable::convertToDTO).collect(Collectors.toList()),
                hops.stream().map(Hop::convertToDTO).collect(Collectors.toList()),
                yeast.stream().map(Yeast::convertToDTO).collect(Collectors.toList())
        );
    }
}
