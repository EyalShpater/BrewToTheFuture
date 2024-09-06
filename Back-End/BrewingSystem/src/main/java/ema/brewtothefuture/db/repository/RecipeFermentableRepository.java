package ema.brewtothefuture.db.repository;

import ema.brewtothefuture.db.model.ingredient.RecipeFermentableDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeFermentableRepository extends JpaRepository<RecipeFermentableDB, Long> {
}
