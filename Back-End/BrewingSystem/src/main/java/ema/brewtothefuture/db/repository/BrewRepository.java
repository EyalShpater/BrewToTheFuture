package ema.brewtothefuture.db.repository;

import ema.brewtothefuture.db.model.BrewDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrewRepository extends JpaRepository<BrewDB, Long> {
}
