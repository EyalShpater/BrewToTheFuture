import React, { useState, useEffect } from "react";
import styles from "./Brew.style.js";
import { COLORS } from "../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import TemperatureBar from "../../components/temperatureBar/TemperatureBar";
import axios from "axios";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";

const data = [
  {
    key: "1",
    title: "Step 1 - Brew Day",
    description: "In process...",
  },
  {
    key: "2",
    title: "Step 2 - Fermentation",
    description: "This is the second step.",
  },
  {
    key: "3",
    title: "Step 3 - Bottling",
    description: "This is the third step.",
  },
  // { key: "4", title: "Step 4", description: "This is the fourth step." },
  // { key: "5", title: "Step 5", description: "This is the fifth step." },
];

const TimelineItem = ({ item }) => (
  <View style={styles.itemContainer}>
    {/* <View style={styles.line} />
    <View style={styles.circle} /> */}
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
  </View>
);

const HorizontalTimeline = () => {
  return (
    // <SafeAreaView style={styles.timeLineContainer}>
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <TimelineItem item={item} />}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const Brew = () => {
  const navigation = useNavigation();
  const [temperature, setTemperature] = useState(50);
  const route = useRoute();
  const { userId } = route.params;
  const [brewData, setBrewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the API
    const fetchBrewData = async () => {
      try {
        const response = await axios.get(
          `https://brewtothefuture.azurewebsites.net/${userId}/api/brew/data/latest?brewId=${brewData.brewId}`
        );
        setBrewData(response.data); // Save the fetched data to state
      } catch (error) {
        console.error("Error fetching brew data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewData();
  }, [userId]);

  // useEffect(() => {
  //   // Simulate temperature change
  //   const interval = setInterval(() => {
  //     setTemperature((prevTemp) => (prevTemp >= 100 ? 0 : prevTemp + 10));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBrewData((prevData) =>
        prevData
          ? {
              ...prevData,
              temperature_celsius: prevData.temperature_celsius + 1,
            }
          : null
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!brewData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Return Button */}
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.returnButtonText}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.welcomeMessage,
            { marginTop: 30 },
            { marginBottom: 30 },
          ]}
        >
          Currently Brewing:
        </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.instructions}> Beer name: Maredsous</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.instructions}>
            Current step:{brewData.current_step}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.instructions}>
            Remaining step time: 40 minutes
          </Text>
        </View>
        <Text style={styles.instructions}> Current temperature: </Text>

        <TemperatureBar temperature={brewData.temperature_celsius} />

        <View style={styles.stopButtonContainer}>
          <TouchableOpacity style={styles.stopButton}>
            <Text style={styles.stopButtonText}>STOP BREWING</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.pauseButton}>
            <Text style={styles.pauseButtonText}>PAUSE BREWING</Text>
          </TouchableOpacity> */}
        </View>
        <HorizontalTimeline />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Brew;
