package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.BrewDB;
import ema.brewtothefuture.db.model.RecipeDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrewRepository extends JpaRepository<BrewDB, Long> {
}
