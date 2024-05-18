import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../screens/welcome/Welcome";
import CreateRecipe from "../screens/CreateRecipe";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipe} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default HomeStack;

// const Home = () => {
//   // const router = useRouter();
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
//       <Stack.Screen
//         options={{
//           headerStyle: { backgroundColor: COLORS.lightWhite },
//           headerShadowVisible: false,
//           headerLeft: () => (
//             <ScreenHeaderBtn iconUrl={icons.menu} dimensions="60%" />
//           ),
//           headerRight: () => (
//             <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
//           ),
//           headerTitle: "",
//         }}
//       />

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View
//           style={{
//             flex: 1,
//             padding: SIZES.medium,
//           }}
//         >
//           <Welcome />
//           <Savedrecipes />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Home;
