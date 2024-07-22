package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.RecipeDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeDB, Long> {
}
