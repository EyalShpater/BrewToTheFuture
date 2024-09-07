package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public class RatingDTO implements DTO {
    private String userId;
    private long   recipeId;
    private double rating;
    private String review;
    private long   reviewDate;

    public RatingDTO() {
    }

    public RatingDTO(String userId, long recipeId, double rating, String review, long reviewDate) {
        this.userId = userId;
        this.recipeId = recipeId;
        this.rating = rating;
        this.review = review;
        this.reviewDate = reviewDate;
    }

    public String getUserId() {
        return userId;
    }

    public long getRecipeId() {
        return recipeId;
    }

    public double getRating() {
        return rating;
    }

    public String getReview() {
        return review;
    }

    public long getReviewDate() {
        return reviewDate;
    }
}
