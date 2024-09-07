package ema.brewtothefuture.controller;

import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.FermentationReportDTO;
import ema.brewtothefuture.dto.front.NotificationDTO;
import ema.brewtothefuture.dto.front.RatingDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.model.system.api.BrewingSystem;
import ema.brewtothefuture.service.BrewingSystemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/")
public class BrewingSystemController {

    private static final Logger log = LoggerFactory.getLogger(BrewingSystemController.class);
    private final BrewingSystem brewingSystem;

    @Autowired
    public BrewingSystemController(BrewingSystemService brewingSystemService) {
        this.brewingSystem = brewingSystemService;
    }

    @PostMapping("brew/recipe")
    public void brew(@RequestBody RecipeDTO recipeDTO) {
        long recipeId = brewingSystem.addNewRecipe(recipeDTO);

        brewingSystem.brewRecipe(recipeId, recipeDTO.user_id());
    }

    @PostMapping("brew/recipe/add")
    public void addRecipe(@RequestBody RecipeDTO recipeDTO) {
        brewingSystem.addNewRecipe(recipeDTO);
    }

    @GetMapping("brew/recipe/all")
    public List<RecipeDTO> getAllRecipes() {
        return brewingSystem.getAllRecipes();
    }

    @GetMapping("brew/recipe/user")
    public List<RecipeDTO> getAllUserRecipes() {
        String userId = GeneralController.getUserId();

        return brewingSystem.getAllUserRecipes(userId);
    }

    @GetMapping("brew/recipe/id/{recipeId}")
    public RecipeDTO getRecipe(@PathVariable int recipeId) {
        return brewingSystem.getRecipe(recipeId);
    }

    @DeleteMapping("brew/recipe/{recipeId}")
    public void deleteRecipe(@PathVariable int recipeId) {
        String userId = GeneralController.getUserId();

        brewingSystem.deleteRecipe(recipeId, userId);
    }

    @GetMapping("brew/methods")
    public List<String> getMethods() {
        return brewingSystem.getBrewingMethods();
    }

    @GetMapping("brew/styles")
    public List<String> getStyles() {
        return brewingSystem.getBrewingStyle();
    }

    @GetMapping("brew/ingredients/hops")
    public List<HopDB> getHops() {
        return brewingSystem.getHops();
    }

    @GetMapping("brew/ingredients/hops/{id}")
    public HopDB getHopById(@PathVariable long id) {
        HopDB hop = brewingSystem.getHopById(id);

        if (hop == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hop not found");
        }

        return hop;
    }

    @GetMapping("brew/ingredients/yeasts")
    public List<YeastDB> getYeasts() {
        return brewingSystem.getYeasts();
    }

    @GetMapping("brew/ingredients/yeasts/{id}")
    public YeastDB getYeastById(@PathVariable long id) {
        YeastDB yeast = brewingSystem.getYeastById(id);

        if (yeast == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Yeast not found");
        }

        return yeast;
    }

    @GetMapping("brew/ingredients/fermentables")
    public List<FermentableDB> getFermentables() {
        return brewingSystem.getFermentables();
    }

    @GetMapping("brew/ingredients/fermentables/{id}")
    public FermentableDB getFermentableById(@PathVariable int id) {
        FermentableDB fermentable = brewingSystem.getFermentableById(id);

        if (fermentable == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fermentable not found");
        }

        return fermentable;
    }

    @PostMapping("brew/recipe/{recipeId}")
    public void brewRecipe(@PathVariable int recipeId) {
        String userId = GeneralController.getUserId();

        brewingSystem.brewRecipe(recipeId, userId);
    }

    @GetMapping("brew/data")
    public List<BrewingReportDTO> getBrewingReport() {
        String userId = GeneralController.getUserId();

        return brewingSystem.getBrewingReport(userId);
    }

    @GetMapping("brew/data/latest")
    public BrewingReportDTO getLatestBrewingReport() {
        String userId = GeneralController.getUserId();

        return brewingSystem.getLatestBrewingReport(userId);
    }

    @GetMapping("fermentation/data")
    public List<FermentationReportDTO> getFermentationReport() {
        String userId = GeneralController.getUserId();

        return brewingSystem.getFermentationReport(userId);
    }

    @GetMapping("fermentation/data/latest")
    public FermentationReportDTO getLatestFermentationReport() {
        String userId = GeneralController.getUserId();

        return brewingSystem.getLatestFermentationReport(userId);
    }

    @GetMapping("notification")
    public NotificationDTO getNotification() {
        String userId = GeneralController.getUserId();

        return brewingSystem.getNotification(userId);
    }

    @PostMapping("brew/recipe/current_brewing/step/complete")
    public void markStepAsComplete() {
        String userId = GeneralController.getUserId();

        try {
            brewingSystem.markCurrentStepAsComplete(userId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No brews for user " + userId);
        }
    }

    @PostMapping("/device/add")
    public void addDevice(@RequestParam String deviceSerialNumber, @RequestParam String type) {
        if (deviceSerialNumber == null || type == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing parameters");
        }

        if (!type.equalsIgnoreCase("brewing") && !type.equalsIgnoreCase("fermentation")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid device type");
        }

        String userId = GeneralController.getUserId();
        brewingSystem.addDeviceToUser(userId, deviceSerialNumber, type);
    }

    @PostMapping("brew/rate/rating/{recipeId}")
    public void rateRecipe(@PathVariable int recipeId, @RequestParam double rating) {
        String userId = GeneralController.getUserId();
        log.info("Rating recipe {} with {}", recipeId, rating);
        brewingSystem.addRating(userId, recipeId, rating);
    }

    @PostMapping("brew/rate/review/{recipeId}")
    public void addReviewToRecipe(@PathVariable int recipeId, @RequestParam String review) {
        String userId = GeneralController.getUserId();

        brewingSystem.addComment(userId, recipeId, review);
    }

    @GetMapping("brew/rate/{recipeId}")
    public List<RatingDTO> getRatingByRecipeId(@PathVariable int recipeId) {
        return brewingSystem.getRatings(recipeId);
    }
}
