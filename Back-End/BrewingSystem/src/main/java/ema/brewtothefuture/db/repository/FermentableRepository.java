package ema.brewtothefuture.db.repository;

import ema.brewtothefuture.db.model.ingredient.data.FermentableDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FermentableRepository extends JpaRepository<FermentableDB, Long> {
}
