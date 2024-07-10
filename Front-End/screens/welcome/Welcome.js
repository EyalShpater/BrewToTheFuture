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
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import styles from "./welcome.style";
import { icons, SIZES, COLORS, images } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import Savedrecipes from "../../components/home/SavedRecipes/SavedRecipes";
import router from "expo-router";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
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
  const bubbles = Array.from({ length: 6 }).map((_, index) => ({
    id: index.toString(),
    translateX: new Animated.Value(Math.random() * (windowWidth - 100)),
    translateY: new Animated.Value(-Math.random() * windowHeight),
    size: Math.random() * 20 + 10,
    delay: index * 1000,
    duration: Math.random() * 8000 + 5000,
  }));

  useEffect(() => {
    bubbles.forEach((bubble) => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(bubble.translateY, {
            toValue: windowHeight + bubble.size * 2, // Adjust the end position as needed
            duration: bubble.duration,
            easing: Easing.linear,
            delay: bubble.delay,
            useNativeDriver: true,
          }),
          Animated.timing(bubble.translateX, {
            toValue: Math.random() * (windowWidth - bubble.size),
            duration: bubble.duration,
            easing: Easing.linear,
            delay: bubble.delay,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ).start();
    });
  }, []);

  return (
    <ImageBackground
      source={images.beer}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* <View
          style={{
            backgroundColor: COLORS.lightWhite,
            paddingHorizontal: SIZES.padding,
          }}
        > */}
        <ScreenHeaderBtn iconUrl={icons.menu} dimensions="60%" />
        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <ScreenHeaderBtn iconUrl={images.user} dimensions="100%" />
        </View>
        {/* </View> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Welcome />
            {/* <Savedrecipes /> */}

            {/* Animated Bubbles */}
            {bubbles.map((bubble) => (
              <Animated.View
                key={bubble.id}
                style={{
                  position: "absolute",
                  transform: [
                    { translateX: bubble.translateX },
                    { translateY: bubble.translateY },
                  ],
                }}
              >
                <View
                  style={{
                    width: bubble.size,
                    height: bubble.size,
                    borderRadius: bubble.size / 2,
                    backgroundColor: "rgba(255, 255, 255, 0.6)", // semi-transparent white
                    borderWidth: 3,
                    borderColor: COLORS.yellow, // lighter border
                  }}
                />
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
