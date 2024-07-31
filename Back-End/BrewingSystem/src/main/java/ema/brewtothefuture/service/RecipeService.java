package ema.brewtothefuture.service;

import com.opencsv.CSVReader;
import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.ingredient.RecipeFermentableDB;
import ema.brewtothefuture.db.model.ingredient.RecipeHopDB;
import ema.brewtothefuture.db.model.ingredient.RecipeYeastDB;
import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import ema.brewtothefuture.model.recipe.impl.Recipe;
import ema.brewtothefuture.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class RecipeService {
    private final  RecipeRepository            recipeRepository;
    private final  FermentableRepository       fermentableRepository;
    private final  HopRepository               hopRepository;
    private final  YeastRepository             yeastRepository;
    private final  RecipeFermentableRepository recipeFermentableRepository;
    private final  RecipeHopRepository         recipeHopRepository;
    private final  RecipeYeastRepository       recipeYeastRepository;
    private static RecipeService               instance;

    @Autowired
    private RecipeService(RecipeRepository recipeRepository, FermentableRepository fermentableRepository,
                          HopRepository hopRepository, YeastRepository yeastRepository,
                          RecipeFermentableRepository recipeFermentableRepository,
                          RecipeHopRepository recipeHopRepository, RecipeYeastRepository recipeYeastRepository) {
        this.recipeRepository = recipeRepository;
        this.fermentableRepository = fermentableRepository;
        this.hopRepository = hopRepository;
        this.yeastRepository = yeastRepository;
        this.recipeFermentableRepository = recipeFermentableRepository;
        this.recipeHopRepository = recipeHopRepository;
        this.recipeYeastRepository = recipeYeastRepository;
        this.instance = this;
    }

    public static RecipeService getInstance() {
        return instance;
    }


    public void loadIngredients() {
        if (fermentableRepository.count() == 0) {
            loadFermentableData();
        }

        if (hopRepository.count() == 0) {
            loadHopData();
        }

        if (yeastRepository.count() == 0) {
            loadYeastData();
        }
    }

    private void loadYeastData() {
        try {
            InputStream inputStream = new ClassPathResource("dataset/yeasts.csv").getInputStream();
            CSVReader csvReader = new CSVReader(new InputStreamReader(inputStream));

            csvReader.readNext(); // Skip header
            List<YeastDB> entities = csvReader.readAll().stream()
                                              .map(values -> new YeastDB(values[0], values[1], values[3],
                                                                         values[4], values[5], values[6], values[7], values[8]))
                                              .collect(Collectors.toList());
            yeastRepository.saveAll(entities);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file", e);
        }
    }

    private void loadHopData() {
        try {
            InputStream inputStream = new ClassPathResource("dataset/hops.csv").getInputStream();
            CSVReader csvReader = new CSVReader(new InputStreamReader(inputStream));

            csvReader.readNext(); // Skip header
            List<HopDB> entities = csvReader.readAll().stream()
                                            .map(values -> new HopDB(values[0], values[1], Double.parseDouble(values[2]), values[3]))
                                            .collect(Collectors.toList());
            hopRepository.saveAll(entities);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file", e);
        }
    }

    private void loadFermentableData() {
        try {
            InputStream inputStream = new ClassPathResource("dataset/fermentables.csv").getInputStream();
            CSVReader csvReader = new CSVReader(new InputStreamReader(inputStream));

            csvReader.readNext(); // Skip header
            List<FermentableDB> entities = csvReader.readAll().stream()
                                                    .map(values -> new FermentableDB(values[0], values[1], values[2],
                                                                                     values[3], values[4], Double.parseDouble(values[5])))
                                                    .collect(Collectors.toList());
            fermentableRepository.saveAll(entities);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file", e);
        }
    }

    public int saveRecipe(Recipe recipe) {
        RecipeDB recipeDB = new RecipeDB(recipe);
        List<RecipeFermentableDB> fermentables = createRecipeFermentablesDBList(recipe, recipeDB);
        List<RecipeHopDB> hops = createRecipeHopsDBList(recipe, recipeDB);
        List<RecipeYeastDB> yeasts = createRecipeYeastsDBList(recipe, recipeDB);

        recipeDB.setFermentables(fermentables);
        recipeDB.setYeasts(yeasts);
        recipeDB.setHops(hops);

        recipeRepository.save(recipeDB);
        recipeFermentableRepository.saveAllAndFlush(fermentables);
        recipeYeastRepository.saveAllAndFlush(yeasts);
        recipeHopRepository.saveAllAndFlush(hops);

        return recipeDB.getId();
    }

    public Recipe getRecipe(long recipeId) {
        return recipeRepository.findById(recipeId)
                               .map(Recipe::new)
                               .orElse(null);
    }

    public RecipeDB getRecipeDB(long recipeId) {
        return recipeRepository.findById(recipeId)
                               .orElse(null);
    }

    private List<RecipeYeastDB> createRecipeYeastsDBList(Recipe recipe, RecipeDB recipeDB) {
        return recipe.getYeast().stream()
                     .map(yeast -> yeastRepository.findById(yeast.getId())
                                                  .map(recipeYeastDB -> new RecipeYeastDB(yeast, recipeYeastDB, recipeDB))
                                                  .orElse(null))
                     .filter(Objects::nonNull)
                     .collect(Collectors.toList());
    }

    private List<RecipeHopDB> createRecipeHopsDBList(Recipe recipe, RecipeDB recipeDB) {
        return recipe.getHops().stream()
                     .map(hop -> hopRepository.findById(hop.getId())
                                              .map(recipeHopDB -> new RecipeHopDB(hop, recipeHopDB, recipeDB))
                                              .orElse(null))
                     .filter(Objects::nonNull)
                     .collect(Collectors.toList());
    }

    private List<RecipeFermentableDB> createRecipeFermentablesDBList(Recipe recipe, RecipeDB recipeDB) {
        return recipe.getFermentables().stream()
                     .map(fermentable -> fermentableRepository.findById(fermentable.getId())
                                                              .map(recipeFermentableDB -> new RecipeFermentableDB(fermentable, recipeFermentableDB, recipeDB))
                                                              .orElse(null))
                     .filter(Objects::nonNull)
                     .collect(Collectors.toList());
    }

    public Collection<RecipeDB> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<FermentableDB> getAllFermentables() {
        return fermentableRepository.findAll();
    }

    public List<YeastDB> getAllYeasts() {
        return yeastRepository.findAll();
    }

    public List<HopDB> getAllHops() {
        return hopRepository.findAll();
    }

    public List<RecipeDB> getAllUserRecipes(String userId) {
        return recipeRepository.findByUserID(userId);
    }

    public void deleteRecipe(long recipeId, String userId) {
        RecipeDB recipe = recipeRepository.findById(recipeId).orElse(null);

        if (recipe != null && recipe.getUserID().equals(userId)) {
            recipeRepository.delete(recipe);
        } else if (recipe == null) {
            throw new IllegalArgumentException("Recipe not found");
        } else {
            throw new IllegalArgumentException("User does not have permission to delete this recipe");
        }
    }
}
