package ema.brewtothefuture.dto.front;

import ema.brewtothefuture.dto.api.DTO;

public class RatingDTO implements DTO {
    private String user_id;
    private long   recipe_id;
    private double rating;
    private String review;
    private long   review_date;

    public RatingDTO() {
    }

    public RatingDTO(String userId, long recipeId, double rating, String review, long reviewDate) {
        this.user_id = userId;
        this.recipe_id = recipeId;
        this.rating = rating;
        this.review = review;
        this.review_date = reviewDate;
    }

    public String getUserId() {
        return user_id;
    }

    public long getRecipeId() {
        return recipe_id;
    }

    public double getRating() {
        return rating;
    }

    public String getReview() {
        return review;
    }

    public long getReviewDate() {
        return review_date;
    }
}
