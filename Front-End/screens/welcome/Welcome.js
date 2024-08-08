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
  ImageBackground,
} from "react-native";
import styles from "./welcome.style";
import { icons, SIZES, images } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import Bubbles from "../../components/bubbles";
import router from "expo-router";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// const searchTypes = ["My beers", "My brewing history"];

const Welcome = () => {
  // const [activeChoice, setActiveChoice] = useState("Explore new beers");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [brewingSession, setBrewingSession] = useState({
    beerName: "IPA",
    currentStep: "Fermentation",
    timeRemaining: "2 hours",
  });
  const navigation = useNavigation();

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

      <TouchableOpacity
        style={styles.brewingSessionContainer}
        onPress={() => navigation.navigate("Brew")}
      >
        <Text style={styles.brewingSessionTitle}>Current Brewing Session</Text>
        <Text style={styles.brewingSessionDetail}>
          Beer Name: {brewingSession.beerName}
        </Text>
        <Text style={styles.brewingSessionDetail}>
          Current Step: {brewingSession.currentStep}
        </Text>
        <Text style={styles.brewingSessionDetail}>
          Time Remaining: {brewingSession.timeRemaining}
        </Text>
        <Text style={styles.seeMoreText}>Touch to see more</Text>
      </TouchableOpacity>

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
  return (
    <ImageBackground
      source={images.beer}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, marginTop: 120 }}>
        <View style={styles.mainMenu}>
          <ScreenHeaderBtn iconUrl={icons.menu} dimensions="60%" />
          <View style={styles.userMenu}>
            <ScreenHeaderBtn iconUrl={images.user} dimensions="100%" />
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
