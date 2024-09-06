package ema.brewtothefuture.service;

import ema.brewtothefuture.db.model.BrewDB;
import ema.brewtothefuture.db.model.BrewingReportDB;
import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.repository.BrewRepository;
import ema.brewtothefuture.db.repository.BrewingReportRepository;
import ema.brewtothefuture.db.repository.FermentationReportRepository;
import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.FermentationReportDTO;
import ema.brewtothefuture.model.heatunit.api.Brew;
import ema.brewtothefuture.model.heatunit.impl.BrewImpl;
import ema.brewtothefuture.model.recipe.impl.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BrewProcessService {
    private final Map<String, Queue<Brew>>     userIdToBrew = new HashMap<>();
    private final RecipeService                recipeService;
    private final BrewingReportRepository      brewingReportRepository;
    private final BrewRepository               brewRepository;
    private final FermentationReportRepository fermentationReportRepository;

    @Autowired
    public BrewProcessService(RecipeService recipeService, BrewingReportRepository brewingReportRepository,
                              BrewRepository brewRepository, FermentationReportRepository fermentationReportRepository) {
        this.recipeService = recipeService;
        this.brewingReportRepository = brewingReportRepository;
        this.brewRepository = brewRepository;
        this.fermentationReportRepository = fermentationReportRepository;
    }

    //todo: 2.8.24
//    public Brew brewRecipeInQueue(String userId) {
//        Recipe toBrew = getRecipeInQueue(userId);
//
//        return (toBrew == null) ?
//                null :
//                addBrew(userId, toBrew);
//    }

    public Brew getBrewInQueue(String userId) {
        Queue<Brew> queue = userIdToBrew.get(userId);

        return (queue == null || queue.isEmpty()) ?
                null :
                queue.peek();
    }

    public void stopRecipeInQueue(int recipeId) {

    }

    public Recipe getRecipeInQueue(String userId) {
        Queue<Brew> brews = userIdToBrew.get(userId);

        return (brews == null || brews.isEmpty()) ?
                null :
                brews.peek().getRecipe();
    }

    private Brew addBrew(String userId, RecipeDB recipe) {
        BrewDB newBrew = new BrewDB();

        newBrew.setRecipe(recipe);
        newBrew.setUserId(userId);
        brewRepository.save(newBrew);
        userIdToBrew.computeIfAbsent(userId, k -> new LinkedList<>()).add(new BrewImpl(newBrew.getId(), userId, new Recipe(recipe)));

        return new BrewImpl(newBrew.getId(), userId, new Recipe(recipe));
    }

    public void addRecipeToBrew(long recipeId, String userId) {
        RecipeDB recipe = recipeService.getRecipeDB(recipeId);
        addBrew(userId, recipe);
    }

    public void markHeadOfQueueAsBrewedInQueue(String userId) {
        try {
            Brew brewed = userIdToBrew.get(userId).remove();
        } catch (NoSuchElementException e) {
            throw new IllegalArgumentException("No brews for user " + userId);
        }
    }

    public List<BrewingReportDTO> getBrewHistory(String userId) {
        long brewId = getBrewId(userId);

        return brewingReportRepository.findAllByBrewId(brewId)
                                      .stream()
                                      .map(BrewingReportDB::convertToDTO)
                                      .toList();
    }

    public BrewingReportDTO getLatestBrewingReport(String userId) {
        long brewId = getBrewId(userId);
        BrewingReportDB reportDB = brewingReportRepository.findFirstByBrewIdOrderByTimestampDesc(brewId);

        return reportDB != null ?
                reportDB.convertToDTO() :
                null;
    }

    public FermentationReportDTO getLatestFermentationReport(String userId) {
        long brewId = getBrewId(userId);

        return fermentationReportRepository.findFirstByBrewIdOrderByTimestampDesc(brewId)
                                           .convertToDTO();
    }

    public long getBrewId(String userId) {
        if (userIdToBrew.get(userId) == null) {
            throw new IllegalArgumentException("No brews for user " + userId);
        }

        Brew brew = userIdToBrew.get(userId).peek();

        if (brew == null) {
            throw new IllegalArgumentException("No brews for user " + userId);
        }

        return brew.getId();
    }
}


