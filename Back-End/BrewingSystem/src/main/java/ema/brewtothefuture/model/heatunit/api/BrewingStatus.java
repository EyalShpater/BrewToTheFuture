package ema.brewtothefuture.model.heatunit.api;

public enum BrewingStatus {
    BREWING(100),
    FERMENTATION(102),
    COMPLETED(200),
    STOPPED(400),
    PENDING(202),
    ERROR(500),
    UNKNOWN(520),
    NOT_STARTED(204);

    private final int code;

    BrewingStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
