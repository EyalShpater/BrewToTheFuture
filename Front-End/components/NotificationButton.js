import React from "react";
import { Button, View } from "react-native";
import * as Notifications from "expo-notifications";

const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Brew To The Future!",
      body: "Add grains",
    },
    trigger: { seconds: 2 },
  });
};

const NotificationButton = () => {
  return (
    <View>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
    </View>
  );
};

export default NotificationButton;
