package ema.brewtothefuture.model.heatunit.impl;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.front.NotificationDTO;
import ema.brewtothefuture.model.heatunit.api.Brew;
import ema.brewtothefuture.model.heatunit.api.BrewingStatus;
import ema.brewtothefuture.model.heatunit.api.FermentationReport;
import ema.brewtothefuture.model.heatunit.api.HeatUnitStatus;
import ema.brewtothefuture.model.notification.api.Notification;
import ema.brewtothefuture.model.notification.impl.NotificationImpl;
import ema.brewtothefuture.model.recipe.impl.Recipe;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

public class BrewImpl implements Brew {
    private final long                     brewId;
    private final String                   userId;
    private       Recipe                   recipe;
    private       int                      currentStepID;
    private       List<FermentationReport> fermentationReports;
    private       BrewingReportDTO         lastBrewingReport;
    private       Notification             notifications;
    private       BrewingStatus            status;
    private       long                     embeddedBrewingReportInterval;
    private final long                     brewingReportInterval;
    private final long                     fermentationReportInterval;
    private final BrewValidator            brewValidator;

    private final Object statusLock = new Object();
    private final Logger logger     = Logger.getLogger(BrewImpl.class.getName());
    Timer timer = new Timer();

//    private List<BrewingReportDTO> brewingReports;
//    public static final int STATUS_OK = 0;

    public BrewImpl(long id, String userId, Recipe recipe) {
        this.brewId = id;
        this.userId = userId;
        this.recipe = recipe;
        this.fermentationReports = new ArrayList<>();
        this.notifications = new NotificationImpl();
        this.status = BrewingStatus.NOT_STARTED;
        this.brewingReportInterval = TimeUnit.SECONDS.toMillis(5);
        this.fermentationReportInterval = TimeUnit.MINUTES.toMillis(5);
        this.brewValidator = new BrewValidator(notifications, brewId);
    }

    @Override
    public String getEndOfStepNotification(int stepId) {
        return recipe.getStepById(stepId).message();
    }

    @Override
    public NotificationDTO getNotification() {
        return notifications.getAndRemoveHeadNotification();
    }

    @Override
    public void stop() {
        synchronized (statusLock) {
            status = BrewingStatus.STOPPED;
        }

        timer.cancel();
        logger.info("stopping brewing " + brewId + " for user " + userId);
    }

    @Override
    public void start(long embeddedReportInterval) {
        synchronized (statusLock) {
            status = BrewingStatus.BREWING;
            logger.info("starting brewing " + brewId + " for user " + userId);
        }


        this.embeddedBrewingReportInterval = embeddedReportInterval;
        TimerTask brewingReportTask = new TimerTask() {
            @Override
            public void run() {
                saveBrewingReportToDB();
            }
        };

        timer.schedule(brewingReportTask, 0, brewingReportInterval);
        brewValidator.setEmbeddedBrewingReportInterval(embeddedBrewingReportInterval);
        brewValidator.startTimeOutTimer();
    }

    @Override
    public Recipe getRecipe() {
        return recipe;
    }

    @Override
    public EmbeddedRecipeDTO getEmbeddedRecipe() {
        return recipe.createEmbeddedRecipeDTO(brewId);
    }

    //todo: 3.8.24
    @Override
    public void addBrewingReport(BrewingReportDTO report) {
        if (report != null) {
            checkValidation(report);
            //add to db
        } else {
            throw new IllegalArgumentException("Report cannot be null");
        }
    }

    @Override
    public List<BrewingReportDTO> getReports() {
//        return brewingReports;
        return null;
    }

    @Override
    public long getBrewId() {
        return brewId;
    }

    private void checkValidation(BrewingReportDTO report) throws IllegalArgumentException {
        HeatUnitStatus statusCode = HeatUnitStatus.fromCode(report.status_code());
        boolean isValid = brewValidator.checkValidation(report);
        if (isValid) {
            switch (statusCode) {
                case HeatUnitStatus.OK:
                    lastBrewingReport = report;
                    break;
                case HeatUnitStatus.CREATED:
                    break;
                case HeatUnitStatus.STEP_COMPLETED:
                case HeatUnitStatus.STEP_COMPLETED_WAIT:
                    handleStepCompletion(report);
                    break;
            }
        }

        lastBrewingReport = report;
    }

    private void handleStepCompletion(BrewingReportDTO report) {
        if (report.status_code() == HeatUnitStatus.STEP_COMPLETED_WAIT.getCode()) {
            synchronized (statusLock) {
                status = BrewingStatus.PENDING;
            }

            String endOfStepNotification = getEndOfStepNotification(currentStepID);
            notifications.addNotification(endOfStepNotification);
            // start timer and if there is no answer in time, handleTimeOut
        }

        if (report.status_code() == HeatUnitStatus.STEP_COMPLETED.getCode()) {
            currentStepID = recipe.getNextStepID(currentStepID);
        }
    }

    private void handleTimeOut() {

    }

    private void handleEmbeddedError() {
        notifications.addNotification("Error in brewing process: " + lastBrewingReport.error_message(),
                                      false,
                                      NotificationImpl.STATUS_ERROR);
    }

    private void saveBrewingReportToDB() {
        logger.info("saving brewing report to db for brew " + brewId);
    }

    @Override
    public void markCurrentStepAsComplete() {
        synchronized (statusLock) {
            if (status == BrewingStatus.PENDING) {
                status = BrewingStatus.BREWING;
                currentStepID = recipe.getNextStepID(currentStepID);
            } else {
                throw new IllegalStateException("Cannot mark step as complete when not in pending state");
            }
        }
    }


    /***** debug *****/
    @Override
    public void addNotification(NotificationDTO notification) {
        notifications.addNotification(notification);
    }
}
