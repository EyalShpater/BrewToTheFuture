package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.ingredient.RecipeYeastDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeYeastRepository extends JpaRepository<RecipeYeastDB, Long> {
}
