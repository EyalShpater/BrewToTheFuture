package ema.brewtothefuture.api;

public enum StatusCode {
    OK(200),
    CREATED(201),
    STEP_COMPLETED(202),
    STEP_COMPLETED_AND_WAIT(205),
    APPROVED(210);

    private final int code;

    StatusCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
