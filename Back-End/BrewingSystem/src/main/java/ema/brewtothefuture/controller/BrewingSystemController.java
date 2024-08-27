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
public class BrewingSystemController {

    private final BrewingSystem brewingSystem;

    @Autowired
    public BrewingSystemController(BrewingSystemService brewingSystemService) {
        this.brewingSystem = brewingSystemService;
    }

    @PostMapping("/api/brew/recipe")
    public void brew(@RequestBody RecipeDTO recipeDTO) {
        long recipeId = brewingSystem.addNewRecipe(recipeDTO);

        brewingSystem.brewRecipe(recipeId, recipeDTO.user_id());
    }

    @PostMapping("/api/brew/recipe/add")
    public void addRecipe(@RequestBody RecipeDTO recipeDTO) {
        brewingSystem.addNewRecipe(recipeDTO);
    }

    @GetMapping("/api/brew/recipes/all")
    public List<RecipeDTO> getAllRecipes() {
        return brewingSystem.getAllRecipes();
    }

    @GetMapping("/api/brew/recipes/{userId}")
    public List<RecipeDTO> getAllUserRecipes(@PathVariable String userId) {
        // if user not found, return 404

        return brewingSystem.getAllUserRecipes(userId);
    }

    @DeleteMapping("/api/{userId}/brew/recipe/{recipeId}")
    public void deleteRecipe(@PathVariable int recipeId, @PathVariable String userId) {
        brewingSystem.deleteRecipe(recipeId, userId);
    }

    @GetMapping("/api/brew/methods")
    public List<String> getMethods() {
        return brewingSystem.getBrewingMethods();
    }

    @GetMapping("/api/brew/styles")
    public List<String> getStyles() {
        return brewingSystem.getBrewingStyle();
    }

    @GetMapping("api/brew/ingredients/hops")
    public List<HopDB> getHops() {
        return brewingSystem.getHops();
    }

    @GetMapping("api/brew/ingredients/hops/{id}")
    public HopDB getHopById(@PathVariable long id) {
        HopDB hop = brewingSystem.getHopById(id);

        if (hop == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hop not found");
        }

        return hop;
    }

    @GetMapping("api/brew/ingredients/yeasts")
    public List<YeastDB> getYeasts() {
        return brewingSystem.getYeasts();
    }

    @GetMapping("api/brew/ingredients/yeasts/{id}")
    public YeastDB getYeastById(@PathVariable long id) {
        YeastDB yeast = brewingSystem.getYeastById(id);

        if (yeast == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Yeast not found");
        }

        return yeast;
    }

    @GetMapping("api/brew/ingredients/fermentables")
    public List<FermentableDB> getFermentables() {
        return brewingSystem.getFermentables();
    }

    @GetMapping("api/brew/ingredients/fermentables/{id}")
    public FermentableDB getFermentableById(@PathVariable int id) {
        FermentableDB fermentable = brewingSystem.getFermentableById(id);

        if (fermentable == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fermentable not found");
        }

        return fermentable;
    }

    @PostMapping("/api/{userId}/brew/recipe/{recipeId}")
    public void brewRecipe(@PathVariable int recipeId, @PathVariable String userId) {
        brewingSystem.brewRecipe(recipeId, userId);
    }

    @GetMapping("{userId}/api/brew/data")
    public List<BrewingReportDTO> getBrewingReport(@PathVariable String userId, @RequestParam int brewId) {
        return brewingSystem.getBrewingReport(userId, brewId);
    }

    @GetMapping("{userId}/api/brew/data/latest")
    public BrewingReportDTO getLatestBrewingReport(String userId, int brewId) {
        return brewingSystem.getLatestBrewingReport(brewId);
    }

    @GetMapping("{userId}/api/fermentation/data")
    public List<FermentationReportDTO> getFermentationReport(@PathVariable String userId, @RequestParam int brewId) {
        return brewingSystem.getFermentationReport(userId, brewId);
    }

    @GetMapping("{userId}/api/fermentation/data/latest")
    public FermentationReportDTO getLatestFermentationReport(@PathVariable String userId, @RequestParam long brewId) {
        return brewingSystem.getLatestFermentationReport(brewId);
    }

    @GetMapping("api/notification/{userId}")
    public NotificationDTO getNotification(@PathVariable String userId) {
        NotificationDTO notification = brewingSystem.getNotification(userId);
        System.out.println("Notification for user " + userId + ": " + notification);
        return notification;
    }

    @PostMapping("api/{userId}/brew/recipe/current_brewing/step/complete")
    public void markStepAsComplete(@PathVariable String userId) {
        try {
            brewingSystem.markCurrentStepAsComplete(userId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No brews for user " + userId);
        }
    }
}
