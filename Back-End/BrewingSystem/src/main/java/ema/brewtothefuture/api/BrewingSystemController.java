package ema.brewtothefuture.api;

import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.RecipeDTO;
import ema.brewtothefuture.recipe.impl.Recipe;
import ema.brewtothefuture.system.api.BrewingSystem;
import ema.brewtothefuture.system.impl.BrewingSystemImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BrewingSystemController {

    private final BrewingSystem brewingSystem = new BrewingSystemImpl();

    @GetMapping("/api/health")
    public String health() {
        return "OK";
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
}
