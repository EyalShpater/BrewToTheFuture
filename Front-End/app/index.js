import { useEffect, useState } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Welcome from "../screens/welcome/Welcome";
import CreateRecipeOne from "../screens/createARecipe/CreateRecipeOne";
import CreateRecipeTwo from "../screens/createARecipe/CreateRecipeTwo";
import CreateRecipeThree from "../screens/createARecipe/CreateRecipeThree.js";
import CreateRecipeFour from "../screens/createARecipe/CreateRecipeFour.js";
import SavedRecipes from "../screens/savedRecipes/SavedRecipes";
import Brew from "../screens/brew/Brew";
import Statistics from "../screens/stats/Statistics";
import ExploreRecipes from "../screens/explore/ExploreRecipes";
import SignIn from "../screens/signIn/SignIn";
import Register from "../screens/register/Register";
import registerNNPushToken from "native-notify";
import { registerForPushNotificationsAsync } from "../utils/notifications";
import * as Notifications from "expo-notifications";
import { ID_TOKEN } from "../utils/idToken";
import axios from "axios";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

const HomeStack = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          "http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/user/details",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );

        setUserId(response.data);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const pollNotifications = async () => {
      try {
        const response = await fetch(
          "http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/notification",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );
        const data = await response.json();

        // Check if there's a new notification
        if (data != null && response.status == 200) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Brew To The Future",
              body: data.message,
              data: { userId },
            },
            trigger: null,
          });
        }
      } catch (error) {
        //console.log("Error polling notifications:", error);
      }
    };

    const interval = setInterval(pollNotifications, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Register native-notify push token
  registerNNPushToken(22838, userId);

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRecipeOne"
        component={CreateRecipeOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRecipeTwo"
        component={CreateRecipeTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRecipeThree"
        component={CreateRecipeThree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRecipeFour"
        component={CreateRecipeFour}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SavedRecipes"
        component={SavedRecipes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Brew"
        component={Brew}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExploreRecipes"
        component={ExploreRecipes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
