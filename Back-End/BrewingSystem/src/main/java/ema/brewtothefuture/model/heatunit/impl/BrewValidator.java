package ema.brewtothefuture.model.heatunit.impl;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.model.heatunit.api.HeatUnitStatus;
import ema.brewtothefuture.model.notification.api.Notification;

import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Logger;

public class BrewValidator {
    private       long             embeddedBrewingReportInterval;
    private       BrewingReportDTO lastBrewingReport;
    private       int              numOfMissedReports;
    private       boolean          isRunning = false;
    private final long             brewId;
    private final Notification     notifications;
    private final Timer            timer;

    private static final Logger logger = Logger.getLogger(BrewValidator.class.getName());

    private static final double DELAY_FACTOR       = 1.5;
    private static final int    MAX_MISSED_REPORTS = 3;

    public BrewValidator(Notification notifications, long brewId) {
        this.notifications = notifications;
        this.brewId = brewId;
        this.timer = new Timer();
    }

    public void setEmbeddedBrewingReportInterval(long embeddedBrewingReportInterval) {
        this.embeddedBrewingReportInterval = embeddedBrewingReportInterval;
        logger.info("Embedded brewing report interval set to: " + embeddedBrewingReportInterval);
    }

    public boolean isRunning() {
        return isRunning;
    }

    public void startTimeOutTimer() {
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                checkTimeOut();
            }
        };

        timer.schedule(task, 3000, (long) (embeddedBrewingReportInterval * DELAY_FACTOR));
        isRunning = true;
        logger.info("Timeout timer started for brew with id: " + brewId);
    }

    public void cancelTimeOutTimer() {
        timer.cancel();
        isRunning = false;
    }

    public boolean checkValidation(BrewingReportDTO report) throws IllegalArgumentException {
        boolean isValid = true;
        HeatUnitStatus statusCode = HeatUnitStatus.fromCode(report.status_code());

        if (statusCode == null) {
            throw new IllegalArgumentException("Invalid status code");
        }

        if (statusCode.equals(HeatUnitStatus.INTERNAL_ERROR)) {
            handleEmbeddedError();
        }

        logger.info("Checking validation for brew with id: " + brewId);
        lastBrewingReport = report;

        return isValid;
    }


    private void checkTimeOut() {
        long currentTime = System.currentTimeMillis();
        long lastReportTime = lastBrewingReport != null ?
                lastBrewingReport.timestamp() :
                0;
        long timeDiff = currentTime - lastReportTime;

        if (timeDiff > embeddedBrewingReportInterval) {
            if (++numOfMissedReports >= MAX_MISSED_REPORTS) {
                notifications.addNotification("Embedded system is not responding");
                numOfMissedReports = 0;
                logger.warning("Embedded system is not responding for brew with id: " + brewId);
            }
        } else {
            numOfMissedReports = 0;
        }
    }

    private void handleEmbeddedError() {
        notifications.addNotification("Error in brewing process: " + lastBrewingReport.error_message());
    }
}
