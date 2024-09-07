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
import Statistics from "../screens/stats/Statistics";
import ExploreRecipes from "../screens/explore/ExploreRecipes";
import GoogleLogin from "../screens/signIn/SignIn";
import Register from "../screens/register/Register";
import registerNNPushToken from "native-notify";
import { registerForPushNotificationsAsync } from "../utils/notifications";
import * as Notifications from "expo-notifications";
import { ID_TOKEN } from "../utils/idToken";

const [userId, setUserId] = useState(null);

useEffect(() => {
  const fetchUserId = async () => {
    try {
      const response = await axios.get(
        "https://brewtothefuture.azurewebsites.net/user/details",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ID_TOKEN}`, // Pass the token in Authorization header
          },
        }
      );

      setUserId(response.data); // Assuming the API returns userId in response.data
    } catch (error) {
      console.error("Error fetching userId:", error);
    }
  };

  fetchUserId();
}, []);

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
          "https://brewtothefuture.azurewebsites.net/api/notification",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ID_TOKEN}`, // Include the idToken here
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
              data: { userId },
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
  registerNNPushToken(22838, userId);

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name="GoogleLogin"
        component={GoogleLogin}
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
