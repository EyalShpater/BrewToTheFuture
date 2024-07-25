package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.ingredient.data.HopDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HopRepository extends JpaRepository<HopDB, Long> {
}
