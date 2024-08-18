package ema.brewtothefuture.service;

import com.opencsv.CSVReader;
import ema.brewtothefuture.db.model.BrewDB;
import ema.brewtothefuture.db.model.BrewingReportDB;
import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.StyleDB;
import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.NotificationDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.model.heatunit.api.Brew;
import ema.brewtothefuture.model.heatunit.api.BrewingStatus;
import ema.brewtothefuture.model.heatunit.api.DeviceManager;
import ema.brewtothefuture.model.heatunit.impl.DeviceManagerImpl;
import ema.brewtothefuture.model.recipe.api.BrewMethod;
import ema.brewtothefuture.model.recipe.impl.Recipe;
import ema.brewtothefuture.model.system.api.BrewingSystem;
import ema.brewtothefuture.repository.BrewRepository;
import ema.brewtothefuture.repository.BrewingReportRepository;
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
    private final DeviceManager deviceManager = new DeviceManagerImpl();

    private final StyleRepository         styleRepository;
    private final RecipeService           recipeService;
    private final BrewProcessService brewProcessService;
    private final BrewingReportRepository brewingReportRepository;
    private final BrewRepository          brewRepository;

    @Autowired
    public BrewingSystemService(StyleRepository styleRepository, RecipeService recipeService,
                                BrewProcessService brewProcessService, BrewingReportRepository brewingReportRepository, BrewRepository brewRepository) {
        this.styleRepository = styleRepository;
        this.recipeService = recipeService;
        this.brewProcessService = brewProcessService;
        this.brewingReportRepository = brewingReportRepository;
        this.brewRepository = brewRepository;
    }

    @Override
    public EmbeddedRecipeDTO getRecipeToBrew(String deviceSerialNumber) {
        String userId = deviceManager.getUser(deviceSerialNumber);
        Brew brew = brewProcessService.getBrewInQueue(userId);

        return brew != null ?
                brew.getEmbeddedRecipe() :
                null;
    }

    @Override
    public void startBrewing(String deviceSerialNumber, long embeddedReportInterval) {
        String userId = deviceManager.getUser(deviceSerialNumber);
        Brew brew = brewProcessService.getBrewInQueue(userId);

        if (brew == null) {
            throw new IllegalArgumentException("No brews for user " + userId);
        }

        brew.start(embeddedReportInterval);
    }

    @Override
    public List<RecipeDTO> getAllRecipes() {
        return recipeService.getAllRecipes()
                            .stream()
                            .map(RecipeDB::convertToDTO)
                            .collect(Collectors.toList());
    }

    @Override
    public List<RecipeDTO> getAllUserRecipes(String userId) {
        return recipeService.getAllUserRecipes(userId)
                            .stream()
                            .map(RecipeDB::convertToDTO)
                            .collect(Collectors.toList());
    }

    @Override
    public void deleteRecipe(long recipeId, String userId) {
        recipeService.deleteRecipe(recipeId, userId);
    }

    @Override
    public void addViewedRecipe(int recipeId) {

    }

    @Override
    public long addNewRecipe(RecipeDTO recipe) {
        return recipeService.saveRecipe(new Recipe(recipe));
    }

    @Override
    public void brewRecipe(long recipeId, String userId) {
        brewProcessService.addRecipeToBrew(recipeId, userId);
    }

    @Override
    public void markBrewingAsFinished(String deviceSerialNumber) {
        String userId = deviceManager.getUser(deviceSerialNumber);
        brewProcessService.markHeadOfQueueAsBrewedInQueue(userId);
    }

    @Override
    public void addBrewingReport(String deviceId, BrewingReportDTO report) {
        BrewDB brew = brewRepository.findById(report.brew_id())
                                    .orElse(null);
        brewingReportRepository.save(new BrewingReportDB(report, brew));
    }

    @Override
    public List<BrewingReportDTO> getBrewingReport(String userId, int brewId) {
        return brewProcessService.getBrewHistory(userId, brewId);
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
    public List<HopDB> getHops() {
        return recipeService.getAllHops();
    }

    @Override
    public HopDB getHopById(long id) {
        return recipeService.getHopById(id);
    }

    @Override
    public List<YeastDB> getYeasts() {
        return recipeService.getAllYeasts();
    }

    @Override
    public YeastDB getYeastById(long id) {
        return recipeService.getYeastById(id);
    }

    @Override
    public List<FermentableDB> getFermentables() {
        return recipeService.getAllFermentables();
    }

    @Override
    public FermentableDB getFermentableById(long id) {
        return recipeService.getFermentableById(id);
    }

    @Override
    public NotificationDTO getNotification(String userID) {
        Brew brew = brewProcessService.getBrewInQueue(userID);

        if (brew == null) {
            throw new IllegalArgumentException("No brews for user " + userID);
        }

        return brew.getNotification();
    }

    @Override
    public void loadData() {
        if (styleRepository.count() <= 0) {
            loadStyle();
        }

        recipeService.loadIngredients();
    }

    @Override
    public void markCurrentStepAsComplete(String userId) {
        Brew brew = brewProcessService.getBrewInQueue(userId);

        if (brew == null) {
            throw new IllegalArgumentException("No brews for user " + userId);
        }

        brew.markCurrentStepAsComplete();
    }

    @Override
    public int getBrewStatus(String deviceSerialNumber) {
        Brew brew = brewProcessService.getBrewInQueue(deviceManager.getUser(deviceSerialNumber));

        return brew != null ?
                brew.getStatus() :
                BrewingStatus.ERROR.getCode();
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


    /****** debug methods *****/
    @Override
    public void addNotification(String userId, String message) {
        Brew brew = brewProcessService.getBrewInQueue(userId);

        if (brew == null) {
            throw new IllegalArgumentException("No brews for user " + userId);
        }

        brew.addNotification(new NotificationDTO(message, System.currentTimeMillis(), false, 200));
    }
}
