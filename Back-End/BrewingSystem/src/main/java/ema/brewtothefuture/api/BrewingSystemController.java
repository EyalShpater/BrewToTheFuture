package ema.brewtothefuture.api;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.system.api.BrewingSystem;
import ema.brewtothefuture.system.impl.BrewingSystemImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
public class BrewingSystemController {

    private final BrewingSystem brewingSystem = new BrewingSystemImpl();

    @GetMapping("/api/health")
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
        int recipeId = brewingSystem.addNewRecipe(recipeDTO);

        brewingSystem.brewRecipe(recipeId, recipeDTO.user_id());
    }

    @GetMapping("/api/brew/all_recipes")
    public List<RecipeDTO> getAllRecipes() {
        return brewingSystem.getAllRecipes();
    }

    @PostMapping("{userId}/api/brew/recipe/{recipeId}")
    public void brewRecipe(@PathVariable int recipeId, @PathVariable String userId) {
        brewingSystem.brewRecipe(recipeId, userId);
    }

    @GetMapping("{deviceSerialNumber}/api/embedded/brew/recipe")
    public EmbeddedRecipeDTO getRecipeToBrew(@PathVariable String deviceSerialNumber) {
        return brewingSystem.getRecipeToBrew(deviceSerialNumber);
    }

    @PutMapping("{deviceSerialNumber}/api/embedded/brew/recipe/marks_as_completed")
    public void markBrewingAsFinished(@PathVariable String deviceSerialNumber) {
        brewingSystem.markBrewingAsFinished(deviceSerialNumber);
    }

    @PostMapping("{deviceSerialNumber}/api/embedded/report/brewing")
    public void addBrewingReport(@PathVariable String deviceSerialNumber, @RequestBody BrewingReportDTO report) {
        brewingSystem.addBrewingReport(deviceSerialNumber, report);
    }

    @GetMapping("{userId}/api/brew/data")
    public List<BrewingReportDTO> getBrewingReport(@PathVariable String userId, @RequestParam int brewId) {
        System.out.println(userId + " " + brewId);
        return brewingSystem.getBrewingReport(userId, brewId);
    }
}
