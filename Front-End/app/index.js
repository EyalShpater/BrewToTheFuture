import { useEffect } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Welcome from "../screens/welcome/Welcome";
import CreateRecipeOne from "../screens/CreateARecipe/CreateRecipeOne";
import CreateRecipeTwo from "../screens/CreateARecipe/CreateRecipeTwo";
import CreateRecipeThree from "../screens/CreateARecipe/CreateRecipeThree.js";
import CreateRecipeFour from "../screens/CreateARecipe/CreateRecipeFour.js";
import SavedRecipes from "../screens/savedRecipes/SavedRecipes";
import Brew from "../screens/brew/Brew";
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

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received:", notification);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response:", response);
      });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  registerNNPushToken(22838, "j8DkJVYmAbfUq04B2jEvYB");

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
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
    </Stack.Navigator>
  );
};

export default HomeStack;
