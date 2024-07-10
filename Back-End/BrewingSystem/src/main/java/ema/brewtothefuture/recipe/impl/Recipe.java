package ema.brewtothefuture.recipe.impl;

import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.recipe.api.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Recipe {
    private final int                recipeId;
    private       MetaData           metaData;
    private       List<RecipeStep>   steps;
    private       List<Notification> notifications;
    private       List<Fermentable>  fermentables;
    private       List<Hop>          hops;
    private       List<Yeast>        yeast;
    private       double             rating;
    private       int                votes;
    private       int                views;

    public Recipe(int recipeId, String authorId) {
        this.metaData = new MetaData(authorId);
        this.recipeId = recipeId;
        this.steps = new ArrayList<>();
        this.notifications = new ArrayList<>();
        this.fermentables = new ArrayList<>();
        this.hops = new ArrayList<>();
        this.yeast = new ArrayList<>();
    }

    public Recipe(RecipeDTO recipeDTO, int recipeId) {
        this.recipeId = recipeId;
        this.rating = 0;
        this.votes = 0;
        this.views = 0;
        this.metaData = new MetaData(recipeDTO.user_id(),
                recipeDTO.recipe_name(),
                BrewMethod.fromString(recipeDTO.method()),
                BrewStyle.fromString(recipeDTO.style()),
                recipeDTO.abv(), recipeDTO.ibu(),
                recipeDTO.original_gravity(),
                recipeDTO.final_gravity(),
                recipeDTO.color(),
                recipeDTO.batch_size_liter()
        );
        this.steps = recipeDTO.recipe().stream().map(RecipeStep::new).collect(Collectors.toList());
        this.notifications = recipeDTO.notifications().stream().map(Notification::new).collect(Collectors.toList());
        this.fermentables = recipeDTO.fermentables().stream().map(Fermentable::new).collect(Collectors.toList());
        this.hops = recipeDTO.hops().stream().map(Hop::new).collect(Collectors.toList());
        this.yeast = recipeDTO.yeast().stream().map(Yeast::new).collect(Collectors.toList());

        addHopsSteps();
    }

    //todo: complete
    private void addHopsSteps() {
        hops.sort((h1, h2) -> h2.getTimeToBrewMinutes() - h1.getTimeToBrewMinutes());

        int maxHopTime = hops.getFirst().getTimeToBrewMinutes();
        int stepId = steps.getLast().stepId() + 1;

//        for (Hop hop : hops) {
//            steps.add(new RecipeStep(stepId++, hop.));
//        }
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

    public EmbeddedRecipeDTO createEmbeddedRecipeDTO(int brewId) {
        return new EmbeddedRecipeDTO(
                brewId,
                recipeId,
                metaData.name(),
                metaData.authorId(),
                steps
                        .stream()
                        .map(RecipeStep::convertToDTO)
                        .collect(Collectors.toList()));
    }

    public int getRecipeId() {
        return recipeId;
    }

    public RecipeDTO convertToDTO() {
        return new RecipeDTO(
                metaData.authorId(),
                recipeId,
                metaData.name(),
                metaData.method().toString(),
                metaData.style().toString(),
                metaData.abv(),
                metaData.ibu(),
                metaData.originalGravity(),
                metaData.finalGravity(),
                metaData.color(),
                metaData.batchSize(),
                steps.stream().map(RecipeStep::convertToFrontDTO).collect(Collectors.toList()),
                notifications.stream().map(Notification::convertToDTO).collect(Collectors.toList()),
                fermentables.stream().map(Fermentable::convertToDTO).collect(Collectors.toList()),
                hops.stream().map(Hop::convertToDTO).collect(Collectors.toList()),
                yeast.stream().map(Yeast::convertToDTO).collect(Collectors.toList())
        );
    }
}
