import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./welcome.style";
import { icons, SIZES, COLORS, images } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import Savedrecipes from "../../components/home/SavedRecipes/SavedRecipes";
import router from "expo-router";

const searchTypes = ["My beers", "My brewing history"];

const Welcome = () => {
  const [activeChoice, setActiveChoice] = useState("Explore new beers");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Adi</Text>
        <Text style={styles.welcomeMessage}>
          Let's start exploring your next beer adventure!
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            placeholderTextColor="#999"
            onChange={() => {}}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={searchTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeChoice, item)}
              onPress={() => {
                setActiveChoice(item);
                router.push("/search/${item}");
              }}
            >
              <Text style={styles.tabText(activeChoice, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Custom header using ScreenHeaderBtn components */}
      <View
        style={{
          backgroundColor: COLORS.lightWhite,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <ScreenHeaderBtn iconUrl={icons.menu} dimensions="60%" />
        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome />
          <Savedrecipes />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

// const searchTypes = ["My beers", "My brewing history"];

// const Welcome = () => {
//   const router = useRouter(); ///////
//   const [activeChoice, setActiveChoice] = useState("Explore new beers");

//   return (
//     <View>
//       <View style={styles.container}>
//         <Text style={styles.userName}>Hello Adi</Text>
//         <Text style={styles.welcomeMessage}>
//           Let's start exploring your next beer adventure!
//         </Text>
//       </View>
//       <View style={styles.searchContainer}>
//         <View style={styles.searchWrapper}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="What are you looking for?"
//             placeholderTextColor="#999"
//             onChange={() => {}}
//           />
//         </View>

//         <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
//           <Image
//             source={icons.search}
//             resizeMode="contain"
//             style={styles.searchBtnImage}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.tabsContainer}>
//         <FlatList
//           data={searchTypes}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.tab(activeChoice, item)}
//               onPress={() => {
//                 setActiveChoice(item);
//                 router.push("/search/${item}");
//               }}
//             >
//               <Text style={styles.tabText(activeChoice, item)}>{item}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item}
//           contentContainerStyle={{ columnGap: SIZES.small }}
//           horizontal
//         />
//       </View>
//     </View>
//   );
// };

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
