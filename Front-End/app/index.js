import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/welcome/Welcome";
import CreateRecipe from "../screens/CreateARecipe/CreateRecipe";
import CreateRecipeTwo from "../screens/CreateARecipe/CreateRecipeTwo";
import CreateRecipeThree from "../screens/CreateARecipe/CreateRecipeThree.js";
import CreateRecipeFour from "../screens/CreateARecipe/CreateRecipeFour.js";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipe} />
      <Stack.Screen name="CreateRecipeTwo" component={CreateRecipeTwo} />
      <Stack.Screen name="CreateRecipeThree" component={CreateRecipeThree} />
      <Stack.Screen name="CreateRecipeFour" component={CreateRecipeFour} />
    </Stack.Navigator>
  );
};

export default HomeStack;
