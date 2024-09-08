import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import styles from "./Welcome.style";
import { useRoute } from "@react-navigation/native";
import { icons, SIZES, images } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import UserManagementMenu from "../../components/common/userManagement/UserManagementMenu";
import Bubbles from "../../components/bubbles";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ID_TOKEN } from "../../utils/idToken.js";

const ModalBrew = () => {
  const [brewData, setBrewData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBrewData = async () => {
      try {
        const response = await axios.get(
          `https://brewtothefuture.azurewebsites.net/api/brew/data/latest`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );

        setBrewData(response.data);
      } catch (error) {
        console.error("Error fetching brew data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewData();
  }, []);

  useEffect(() => {
    const fetchBrewData = async () => {
      try {
        const response = await axios.get(
          `https://brewtothefuture.azurewebsites.net/api/brew/recipe/id/${brewData.recipe_id}`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );

        setRecipeData(response.data);
      } catch (error) {
        console.error("Error fetching brew data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // if (!brewData) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Text>No data available</Text>
  //     </SafeAreaView>
  //   );
  // }

  const calculateTimeDifference = (stepStartTime) => {
    const currentTime = Date.now();
    const timeDifference = currentTime - stepStartTime;

    const date = new Date(timeDifference);

    // Extract hours and minutes from the Date object
    const hours = date.getUTCHours(); // Use getUTCHours to handle the difference correctly
    const minutes = date.getUTCMinutes(); // Use getUTCMinutes for consistent time

    // Return the formatted time as a string
    return `${hours}h ${minutes}m`;
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.brewingSessionContainer}
        onPress={() => navigation.navigate("Brew")}
      >
        {brewData.length != 0 ? (
          <>
            <Text style={styles.brewingSessionTitle}>
              Current Brewing Session
            </Text>
            <Text style={styles.brewingSessionDetail}>
              Beer Name: {recipeData.recipe_name}
            </Text>
            <Text style={styles.brewingSessionDetail}>
              Current Step: {brewData.current_step}
            </Text>
            <Text style={styles.brewingSessionDetail}>
              Time Remaining:{" "}
              {calculateTimeDifference(brewData.step_start_time)}
            </Text>
            <Text style={styles.seeMoreText}>Touch to see more</Text>
          </>
        ) : (
          <Text style={styles.noSessionText}>
            There is no brewing session occurring right now
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const Welcome = () => {
  // const [activeChoice, setActiveChoice] = useState("Explore new beers");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotificationMessage(notification.request.content.body);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleNotificationAction = () => {
    setNotificationMessage(null);
  };

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

      {/* <View style={styles.tabsContainer}>
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
      </View> */}

      <ModalBrew />

      {notificationMessage && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationMessage}>{notificationMessage}</Text>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleNotificationAction}
          >
            <Text style={styles.notificationButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Home = () => {
  const route = useRoute();

  return (
    <ImageBackground
      source={images.beer}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, marginTop: 120 }}>
        <View style={styles.mainMenu}>
          <ScreenHeaderBtn iconUrl={icons.menu} />
          <View style={styles.userMenu}>
            <UserManagementMenu iconUrl={images.user} />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Welcome />
          </View>
          {/* <Savedrecipes /> */}

          <Bubbles />
          {/* <NotificationButton /> */}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
