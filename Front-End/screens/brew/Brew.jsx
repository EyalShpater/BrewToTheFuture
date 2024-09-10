import React, { useState, useEffect } from "react";
import styles from "./Brew.style.js";
import { useNavigation } from "@react-navigation/native";
import TemperatureBar from "../../components/temperatureBar/TemperatureBar";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ID_TOKEN } from "../../utils/idToken.js";

const HorizontalTimeline = ({ stepNumber, recipe }) => {
  const updatedData = recipe.map((item, index) => {
    let newDescription = "Not started yet";

    if (index + 1 < stepNumber) {
      newDescription = "Done";
    } else if (index + 1 === stepNumber) {
      newDescription = `In process - Total step time: ${item.duration_minutes} minutes`;
    }

    let newTitle;

    if (item.message == null) {
      newTitle = `Step ${index + 1} - Maintaining ${
        item.temperature_celsius
      }°C for ${item.duration_minutes} minutes`;
    } else {
      newTitle = `Step ${index + 1} - ${item.message}`;
    }

    return {
      key: (index + 1).toString(),
      title: newTitle,
      description: newDescription,
    };
  });

  return (
    <SafeAreaView>
      <FlatList
        data={updatedData}
        renderItem={({ item }) => <TimelineItem item={item} />}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const TimelineItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.title}>{item.title}</Text>
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>{item.description}</Text>
      {item.description === "Done" && (
        <Icon
          name="check-circle"
          size={24}
          color="green"
          style={styles.checkIcon}
        />
      )}
    </View>
  </View>
);

const Brew = () => {
  const navigation = useNavigation();
  const [brewData, setBrewData] = useState();
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrewData = async () => {
      try {
        const response = await axios.get(
          `http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/data/latest`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );

        const brewDataResponse = response.data;
        setBrewData(brewDataResponse);

        if (brewDataResponse.recipe_id) {
          const recipeResponse = await axios.get(
            `http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/recipe/id/${brewDataResponse.recipe_id}`,
            {
              headers: {
                Authorization: `Bearer ${ID_TOKEN}`,
              },
            }
          );

          setRecipeData(recipeResponse.data);
        }
      } catch (error) {
        //console.log("Error fetching brew or recipe data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewData();
    const interval = setInterval(fetchBrewData, 5000);

    return () => clearInterval(interval);
  }, []);

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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleStopBrewing = async () => {
    try {
      const response = await axios.post(
        "http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/stop",
        {},
        {
          headers: {
            Authorization: `Bearer ${ID_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Brewing stopped successfully:", response.data);
        navigation.navigate("Welcome");
      } else {
        console.log("Unexpected response status:", response.status);
        Alert.alert("Error", "Failed to stop brewing. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to stop brewing. Please try again.");
      console.log("Error stopping brew:", error);
    }
  };

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
        {brewData != null && recipeData != null ? (
          <>
            <View style={styles.dataContainer}>
              <Text style={styles.instructions}>
                Beer name: {recipeData.recipe_name}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.instructions}>
                Current step: {brewData.current_step}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.instructions}>
                Time passed: {calculateTimeDifference(brewData.step_start_time)}
              </Text>
            </View>
            <Text style={styles.instructions}> Current temperature: </Text>
            <TemperatureBar
              temperature={brewData.temperature_celsius.toFixed(2)}
            />
            <View style={styles.stopButtonContainer}>
              <TouchableOpacity
                style={styles.stopButton}
                onPress={handleStopBrewing}
              >
                <Text style={styles.stopButtonText}>STOP BREWING</Text>
              </TouchableOpacity>
            </View>

            <HorizontalTimeline
              stepNumber={brewData.current_step}
              recipe={recipeData.recipe}
            />
          </>
        ) : (
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyText}>
              There is no brewing session occurring right now
            </Text>
            <HorizontalTimeline
              stepNumber={0}
              recipe={[
                {
                  step_id: 1,
                  message: "Brew Day",
                },
                {
                  step_id: 2,
                  message: "Fermentation",
                },
                {
                  step_id: 3,
                  message: "Bottling",
                },
              ]}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Brew;
