import { useEffect } from "react";
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
import AIRecipe from "../screens/AI/AIRecipe";
import ExploreRecipes from "../screens/explore/ExploreRecipes";
import SignIn from "../screens/signIn/SignIn";
import Register from "../screens/register/Register";
import registerNNPushToken from "native-notify";
import { registerForPushNotificationsAsync } from "../utils/notifications";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

const HomeStack = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const pollNotifications = async () => {
      try {
        const response = await fetch(
          "https://brewtothefuture.azurewebsites.net/api/notification/ilwejkrfhiuy4o3y4ljkblkdj",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        // Check if there's a new notification
        if (data != null) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Brew To The Future",
              body: data.message,
              data: { userId: "ilwejkrfhiuy4o3y4ljkblkdj" },
            },
            trigger: null, // Immediate notification
          });
        }
      } catch (error) {
        // console.error("Error polling notifications:", error);
      }
    };

    const interval = setInterval(pollNotifications, 50000000000000000000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Register native-notify push token
  registerNNPushToken(22838, "j8DkJVYmAbfUq04B2jEvYB");

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
        name="AIRecipe"
        component={AIRecipe}
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
