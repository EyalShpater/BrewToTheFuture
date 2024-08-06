package ema.brewtothefuture.controller;

import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.NotificationDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.model.system.api.BrewingSystem;
import ema.brewtothefuture.service.BrewingSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
public class BrewingSystemController {

    private final BrewingSystem brewingSystem;

    @Autowired
    public BrewingSystemController(BrewingSystemService brewingSystemService) {
        this.brewingSystem = brewingSystemService;
    }

    @GetMapping({ "/api/health", "/" })
    public String health() {
        List<String> sentences = List.of(
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "I'm reading a book on the history of glue. I just can't seem to put it down!",
                "Why don't scientists trust atoms? Because they make up everything!",
                "What do you call a fish wearing a crown? A kingfish!",
                "Why did the tomato turn red? Because it saw the salad dressing!",
                "What do you call a factory that makes okay products? A satisfactory!",
                "Why did the math book look sad? Because it had too many problems!",
                "What do you call a belt made out of watches? A waist of time!",
                "Matan Ma Lo Purim Hayom?",
                "Adi Raza and Zodeket",
                "Eyal HaMelech",
                "BBZNOT");
        Random random = new Random();
        int index = random.nextInt(sentences.size());

        return sentences.get(index);
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
            throw new IllegalArgumentException("Hop not found");
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
            throw new IllegalArgumentException("Yeast not found");
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
            throw new IllegalArgumentException("Fermentable not found");
        }

        return fermentable;
    }

    @PostMapping("/api/{userId}/brew/recipe/{recipeId}")
    public void brewRecipe(@PathVariable int recipeId, @PathVariable String userId) {
        brewingSystem.brewRecipe(recipeId, userId);
    }

    @GetMapping("/api/embedded/{deviceSerialNumber}/brew/recipe")
    public EmbeddedRecipeDTO getRecipeToBrew(@PathVariable String deviceSerialNumber) {
        return brewingSystem.getRecipeToBrew(deviceSerialNumber);
    }

    @PostMapping("/api/embedded/{deviceSerialNumber}/brew/start")
    public void startBrewing(@PathVariable String deviceSerialNumber, @RequestParam long embeddedReportInterval) {
        brewingSystem.startBrewing(deviceSerialNumber, embeddedReportInterval);
    }

    @PutMapping("api/embedded/{deviceSerialNumber}/brew/recipe/marks_as_completed")
    public void markBrewingAsFinished(@PathVariable String deviceSerialNumber) {
        brewingSystem.markBrewingAsFinished(deviceSerialNumber);
    }

    @PostMapping("api/embedded{deviceSerialNumber}/report/brewing")
    public void addBrewingReport(@PathVariable String deviceSerialNumber, @RequestBody BrewingReportDTO report) {
        brewingSystem.addBrewingReport(deviceSerialNumber, report);
    }

    @GetMapping("{userId}/api/brew/data")
    public List<BrewingReportDTO> getBrewingReport(@PathVariable String userId, @RequestParam int brewId) {
        return brewingSystem.getBrewingReport(userId, brewId);
    }

    @GetMapping("api/notification/{userId}")
    public NotificationDTO getNotification(@PathVariable String userId) {
        NotificationDTO notification = brewingSystem.getNotification(userId);
        System.out.println("Notification for user " + userId + ": " + notification);
        return notification;
    }

    @GetMapping("api/init/load_data")
    public void loadData() {
        brewingSystem.loadData();
    }
}
