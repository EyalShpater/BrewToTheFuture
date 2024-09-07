package ema.brewtothefuture.db.repository;

import ema.brewtothefuture.db.model.RatingDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<RatingDB, Long> {
    List<RatingDB> getRatingByRecipeId(long recipeId);

    RatingDB getRatingByRecipeIdAndUserId(long recipeId, String userId);
}
