package ema.brewtothefuture.model.recipe.impl;

import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.model.recipe.api.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class Recipe {

    private long recipeId;
    private MetaData           metaData;
    private List<RecipeStep>   steps;
    private List<Notification> notifications;
    private List<Fermentable>  fermentables;
    private List<Hop>          hops;
    private List<Yeast>        yeast;
    //    private double             rating;
    private int                votes;
    private int                views;

    public static final int END_OF_STEP_ID = -1;

    public Recipe(int recipeId, String authorId) {
        this.metaData = new MetaData(authorId);
        this.recipeId = recipeId;
        this.steps = new ArrayList<>();
        this.notifications = new ArrayList<>();
        this.fermentables = new ArrayList<>();
        this.hops = new ArrayList<>();
        this.yeast = new ArrayList<>();
    }

    public Recipe(RecipeDB recipe) {
        this.recipeId = recipe.getId();
//        this.rating = recipe.getRating();
//        this.votes = recipe.getVotes();
        this.views = recipe.getViews();
        this.metaData = new MetaData(recipe.getUserID(),
                                     recipe.getRecipeName(),
                                     BrewMethod.fromString(recipe.getMethod()),
                                     BrewStyle.fromString(recipe.getStyle()),
                                     recipe.getAbv(), recipe.getIbu(),
                                     recipe.getOriginalGravity(),
                                     recipe.getFinalGravity(),
                                     recipe.getColor(),
                                     recipe.getBatchSizeLiter(),
                                     System.currentTimeMillis()
        );
        this.steps = recipe.getSteps();
        this.notifications = recipe.getNotifications();
        this.fermentables = recipe.getFermentables().stream().map(Fermentable::new).collect(Collectors.toList());
        this.hops = recipe.getHops().stream().map(Hop::new).collect(Collectors.toList());
        this.yeast = recipe.getYeasts().stream().map(Yeast::new).collect(Collectors.toList());
    }

    public Recipe(RecipeDTO recipeDTO) {
//        this.rating = 0;
//        this.votes = 0;
//        this.views = 0;
        this.metaData = new MetaData(recipeDTO.user_id(),
                                     recipeDTO.recipe_name(),
                                     BrewMethod.fromString(recipeDTO.method()),
                                     BrewStyle.fromString(recipeDTO.style()),
                                     recipeDTO.abv(), recipeDTO.ibu(),
                                     recipeDTO.original_gravity(),
                                     recipeDTO.final_gravity(),
                                     recipeDTO.color(),
                                     recipeDTO.batch_size_liter(),
                                     System.currentTimeMillis()
        );
        this.steps = recipeDTO.recipe().stream().map(RecipeStep::new).collect(Collectors.toList());
        this.notifications = recipeDTO.notifications().stream().map(Notification::new).collect(Collectors.toList());
        this.fermentables = recipeDTO.fermentables().stream().map(Fermentable::new).collect(Collectors.toList());
        this.hops = recipeDTO.hops().stream().map(Hop::new).collect(Collectors.toList());
        this.yeast = recipeDTO.yeast().stream().map(Yeast::new).collect(Collectors.toList());

        addHopsSteps();
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    private void addHopsSteps() {
        hops.sort((h1, h2) -> h2.getTimeToBrewMinutes() - h1.getTimeToBrewMinutes());

        AtomicInteger prevHopTime = new AtomicInteger(hops.getFirst().getTimeToBrewMinutes());
        AtomicInteger stepId = new AtomicInteger(steps.getLast().stepId() + 1);
        double temperature = steps.getLast().temperature();

        hops.forEach(hop -> {
            int timeToBrew = hop.getTimeToBrewMinutes();
            String description = "Add hop: " + hop.getId();
            int time = (hops.indexOf(hop) == 0) ?
                    0 :
                    prevHopTime.get() - timeToBrew;
            steps.add(new RecipeStep(
                    stepId.getAndIncrement(),
                    temperature,
                    time,
                    true,
                    description));
            prevHopTime.set(timeToBrew);
        });

        steps.add(new RecipeStep(
                stepId.getAndIncrement(),
                temperature,
                hops.getLast().getTimeToBrewMinutes(),
                true,
                "End of brewing"));
    }

    public String getAuthorId() {
        return metaData.authorId();
    }

//    public double getRating() {
//        return rating;
//    }

    public int getVotes() {
        return votes;
    }

    public int getViews() {
        return views;
    }

    public List<RecipeStep> getSteps() {
        return steps;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public MetaData getMetaData() {
        return metaData;
    }

    public List<Fermentable> getFermentables() {
        return fermentables;
    }

    public List<Hop> getHops() {
        return hops;
    }

    public List<Yeast> getYeast() {
        return yeast;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public void setViews(int views) {
        this.views = views;
    }


    public EmbeddedRecipeDTO createEmbeddedRecipeDTO(long brewId) {
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

    public long getRecipeId() {
        return recipeId;
    }

    public RecipeStep getStepById(int stepId) {
        return steps
                .stream()
                .filter(step -> step.stepId() == stepId)
                .findFirst()
                .orElse(null);
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
                metaData.timeCreated(),
                steps.stream().map(RecipeStep::convertToFrontDTO).collect(Collectors.toList()),
                notifications.stream().map(Notification::convertToDTO).collect(Collectors.toList()),
                fermentables.stream().map(Fermentable::convertToDTO).collect(Collectors.toList()),
                hops.stream().map(Hop::convertToDTO).collect(Collectors.toList()),
                yeast.stream().map(Yeast::convertToDTO).collect(Collectors.toList())
        );
    }

    public int getNextStepID(int currentStepID) {
        int currentStepIndex = steps.indexOf(getStepById(currentStepID));

        return (currentStepIndex == steps.size() - 1) ?
                END_OF_STEP_ID :
                steps.get(currentStepIndex + 1).stepId();
    }
}
