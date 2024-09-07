package ema.brewtothefuture.db.model;

import ema.brewtothefuture.dto.api.DTOConvertible;
import ema.brewtothefuture.dto.front.RatingDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "rating")
public class RatingDB implements DTOConvertible<RatingDTO> {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long     id;
    private String   userId;
    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeDB recipe;
    private double   rating;
    private String   review;
    @Column(name = "review_date")
    private long     reviewDate;


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public RecipeDB getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeDB recipe) {
        this.recipe = recipe;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public long getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(long date) {
        this.reviewDate = date;
    }

    @Override
    public RatingDTO convertToDTO() {
        return new RatingDTO(userId, recipe.getId(), rating, review, reviewDate);
    }
}