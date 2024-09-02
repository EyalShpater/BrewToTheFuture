package ema.brewtothefuture.controller;

import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.FermentationReportDTO;
import ema.brewtothefuture.dto.front.NotificationDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.model.system.api.BrewingSystem;
import ema.brewtothefuture.service.BrewingSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/")
public class BrewingSystemController {

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

    @GetMapping("brew/recipes/all")
    public List<RecipeDTO> getAllRecipes() {
        return brewingSystem.getAllRecipes();
    }

    @GetMapping("brew/recipes/{userId}")
    public List<RecipeDTO> getAllUserRecipes(@PathVariable String userId) {
        // if user not found, return 404

        return brewingSystem.getAllUserRecipes(userId);
    }

    @DeleteMapping("{userId}/brew/recipe/{recipeId}")
    public void deleteRecipe(@PathVariable int recipeId, @PathVariable String userId) {
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

    @PostMapping("{userId}/brew/recipe/{recipeId}")
    public void brewRecipe(@PathVariable int recipeId, @PathVariable String userId) {
        brewingSystem.brewRecipe(recipeId, userId);
    }

    @GetMapping("{userId}/brew/data")
    public List<BrewingReportDTO> getBrewingReport(@PathVariable String userId) {
        return brewingSystem.getBrewingReport(userId);
    }

    @GetMapping("{userId}/brew/data/latest")
    public BrewingReportDTO getLatestBrewingReport(@PathVariable String userId) {
        return brewingSystem.getLatestBrewingReport(userId);
    }

    @GetMapping("{userId}/fermentation/data")
    public List<FermentationReportDTO> getFermentationReport(@PathVariable String userId) {
        return brewingSystem.getFermentationReport(userId);
    }

    @GetMapping("{userId}/fermentation/data/latest")
    public FermentationReportDTO getLatestFermentationReport(@PathVariable String userId) {
        return brewingSystem.getLatestFermentationReport(userId);
    }

    @GetMapping("notification/{userId}")
    public NotificationDTO getNotification(@PathVariable String userId) {
        NotificationDTO notification = brewingSystem.getNotification(userId);
        System.out.println("Notification for user " + userId + ": " + notification);
        return notification;
    }

    @PostMapping("{userId}/brew/recipe/current_brewing/step/complete")
    public void markStepAsComplete(@PathVariable String userId) {
        try {
            brewingSystem.markCurrentStepAsComplete(userId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No brews for user " + userId);
        }
    }
}
