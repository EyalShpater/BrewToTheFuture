package ema.brewtothefuture.service;

import com.opencsv.CSVReader;
import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.StyleDB;
import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.model.heatunit.api.Brew;
import ema.brewtothefuture.model.heatunit.api.BrewingManager;
import ema.brewtothefuture.model.heatunit.api.DeviceManager;
import ema.brewtothefuture.model.heatunit.impl.BrewingManagerImpl;
import ema.brewtothefuture.model.heatunit.impl.DeviceManagerImpl;
import ema.brewtothefuture.model.recipe.api.BrewMethod;
import ema.brewtothefuture.model.recipe.impl.Recipe;
import ema.brewtothefuture.model.system.api.BrewingSystem;
import ema.brewtothefuture.repository.RecipeRepository;
import ema.brewtothefuture.repository.StyleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrewingSystemService implements BrewingSystem {
    private final BrewingManager brewingManager = new BrewingManagerImpl();
    private final DeviceManager  deviceManager  = new DeviceManagerImpl();

    private final RecipeRepository recipeRepository;
    private final StyleRepository styleRepository;
    private final RecipeService   recipeService;

    @Autowired
    public BrewingSystemService(RecipeRepository recipeRepository, StyleRepository styleRepository, RecipeService recipeService) {
        this.recipeRepository = recipeRepository;
        this.styleRepository = styleRepository;
        this.recipeService = recipeService;
    }

    //todo: db
    @Override
    public EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber) {
        String userId = deviceManager.getUser(deviceSerialNumber);
        Brew brew = brewingManager.getBrewInQueue(userId);

        return brew != null ?
                brew.getEmbeddedRecipe() :
                null;
    }

    @Override
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findAll()
                               .stream()
                               .map(RecipeDB::convertToDTO)
                               .collect(Collectors.toList());
    }

    @Override
    public void addViewedRecipe(int recipeId) {

    }

    //todo: maybe delete the recipeManager
    @Override
    public int addNewRecipe(RecipeDTO recipe) {
//        Recipe newRecipe = recipeManager.addRecipe(recipe);
//        recipeService.saveRecipe(newRecipe);
//        return newRecipe.getRecipeId();
        int id = recipeService.saveRecipe(new Recipe(recipe));
        System.out.println("Recipe added with id: " + id);
        return id;
    }

    @Override
    public void brewRecipe(int recipeId, String userId) {
        brewingManager.addRecipeToBrew(recipeId, userId);
    }

    @Override
    public void markBrewingAsFinished(String deviceSerialNumber) {
        String userId = deviceManager.getUser(deviceSerialNumber);
        brewingManager.markHeadOfQueueAsBrewedInQueue(userId);
    }

    //todo: db
    @Override
    public void addBrewingReport(String deviceId, BrewingReportDTO report) {
        String userId = deviceManager.getUser(deviceId);
        brewingManager.getBrewInQueue(userId).addBrewingReport(report);
    }

    //todo: db
    @Override
    public List<BrewingReportDTO> getBrewingReport(String userId, int brewId) {
        return brewingManager.getBrewHistory(userId, brewId);
    }

    @Override
    public List<String> getBrewingMethods() {
        return Arrays.stream(BrewMethod.values())
                     .map(Enum::toString)
                     .collect(Collectors.toList());
    }

    @Override
    public List<String> getBrewingStyle() {
        return styleRepository.findAll()
                              .stream()
                              .map(StyleDB::getName)
                              .collect(Collectors.toList());
    }

    @Override
    public List<String> getIngredients(String type) {
//        return ingredientRepository.findByType(type)
//                                   .stream()
//                                   .map(IngredientDB::getName)
//                                   .collect(Collectors.toList());
        return null;
    }

    @Override
    public void loadData() {
        if (styleRepository.count() <= 0) {
            loadStyle();
        }

        recipeService.loadIngredients();
    }

    private void loadStyle() {
        try (CSVReader csvReader = new CSVReader(new InputStreamReader(new ClassPathResource("dataset/styleData.csv").getInputStream()))) {
            csvReader.readNext();
            List<StyleDB> entities = csvReader.readAll().stream()
                                              .map(values -> new StyleDB(values[0]))
                                              .collect(Collectors.toList());
            styleRepository.saveAll(entities);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file", e);
        }
    }

}
