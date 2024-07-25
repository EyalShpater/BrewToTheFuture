package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.ingredient.RecipeHopDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeHopRepository extends JpaRepository<RecipeHopDB, Long> {
}
