package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.IngredientDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<IngredientDB, Long> {
    IngredientDB findByName(String name);

    List<IngredientDB> findByType(String type);
}
