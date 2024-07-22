package ema.brewtothefuture.db.model.converter;

import ema.brewtothefuture.model.recipe.api.Notification;
import ema.brewtothefuture.model.recipe.api.RecipeStep;

import java.util.List;

public class CombinedStepsNotifications {
    private List<RecipeStep>   steps;
    private List<Notification> notifications;

    // Getters and Setters
    public List<RecipeStep> getSteps() {
        return steps;
    }

    public void setSteps(List<RecipeStep> steps) {
        this.steps = steps;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }
}
