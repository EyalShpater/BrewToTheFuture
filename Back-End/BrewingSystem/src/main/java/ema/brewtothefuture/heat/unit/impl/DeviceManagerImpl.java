package ema.brewtothefuture.heat.unit.impl;

import ema.brewtothefuture.heat.unit.api.DeviceManager;

import java.util.HashMap;
import java.util.Map;

public class DeviceManagerImpl implements DeviceManager {
    Map<String, String> userToDevice;
    Map<String, String> deviceToUser;

    public DeviceManagerImpl() {
        this.userToDevice = new HashMap<>();
        this.deviceToUser = new HashMap<>();

        userToDevice.put("ilwejkrfhiuy4o3y4ljkblkdj", "1234");
        deviceToUser.put("1234", "ilwejkrfhiuy4o3y4ljkblkdj");
    }

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
