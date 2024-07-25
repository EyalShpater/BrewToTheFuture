package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.ingredient.data.YeastDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YeastRepository extends JpaRepository<YeastDB, Long> {
}
