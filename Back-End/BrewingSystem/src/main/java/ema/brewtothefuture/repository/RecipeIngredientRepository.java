package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.RecipeDB;
import ema.brewtothefuture.db.model.RecipeIngredientDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredientDB, Long> {
}
