package ema.brewtothefuture.model.heatunit.api;

public interface DeviceManager {
    void addDevice(String deviceId, String userId);
    void removeDevice(String deviceId, String userId);
    String getDevice(String userId);
    String getUser(String deviceId);
}
