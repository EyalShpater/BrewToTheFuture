import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/welcome/Welcome";
import CreateRecipeOne from "../screens/CreateARecipe/CreateRecipeOne";
import CreateRecipeTwo from "../screens/CreateARecipe/CreateRecipeTwo";
import CreateRecipeThree from "../screens/CreateARecipe/CreateRecipeThree.js";
import CreateRecipeFour from "../screens/CreateARecipe/CreateRecipeFour.js";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default HomeStack;
