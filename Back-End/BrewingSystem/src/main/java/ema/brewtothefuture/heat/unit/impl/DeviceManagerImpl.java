package ema.brewtothefuture.heat.unit.impl;

import ema.brewtothefuture.heat.unit.api.DeviceManager;

import java.util.Map;

public class DeviceManagerImpl implements DeviceManager {
    Map<String, String> userToDevice = new java.util.HashMap<>();
    Map<String, String> deviceToUser = new java.util.HashMap<>();

    @Override
    public void addDevice(String deviceId, String userId) {
        userToDevice.put(userId, deviceId);
        deviceToUser.put(deviceId, userId);
    }

    @Override
    public void removeDevice(String deviceId, String userId) {
        userToDevice.put(userId, null);
        deviceToUser.put(deviceId, null);
    }

    @Override
    public String getDevice(String userId) {
        return userToDevice.get(userId);
    }

    @Override
    public String getUser(String deviceId) {
        return deviceToUser.get(deviceId);
    }
}
