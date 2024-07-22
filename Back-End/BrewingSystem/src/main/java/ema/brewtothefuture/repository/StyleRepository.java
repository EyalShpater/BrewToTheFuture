package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.StyleDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StyleRepository extends JpaRepository<StyleDB, Integer> {
}
