package ema.brewtothefuture.model.heatunit.api;

public enum HeatUnitStatus {
    OK(200),
    CREATED(201),
    STEP_COMPLETED(202),
    STEP_COMPLETED_WAIT(205),
    INTERNAL_ERROR(500);

    private final int code;

    HeatUnitStatus(int code) {
        this.code = code;
    }

    public static HeatUnitStatus fromCode(int code) {
        for (HeatUnitStatus status : values()) {
            if (status.code == code) {
                return status;
            }
        }

        return null;
    }

    public int getCode() {
        return code;
    }
}
