import React, { useState, useEffect } from "react";
import styles from "./Brew.style.js";
import { useNavigation, useRoute } from "@react-navigation/native";
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

const data = [
  {
    key: "1",
    title: "Step 1 - Brew Day",
    description: "In process...",
  },
  {
    key: "2",
    title: "Step 2 - Fermentation",
    description: "Not started yet",
  },
  {
    key: "3",
    title: "Step 3 - Bottling",
    description: "Not started yet",
  },
];

// const TimelineItem = ({ item }) => (
//   <View style={styles.itemContainer}>
//     <Text style={styles.title}>{item.title}</Text>
//     <Text style={styles.description}>{item.description}</Text>
//   </View>
// );

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

const HorizontalTimeline = ({ stepNumber }) => {
  const updatedData = data.map((item) => {
    let newDescription = "Not started yet";

    if (parseInt(item.key) < stepNumber) {
      newDescription = "Done";
    } else if (parseInt(item.key) === stepNumber) {
      newDescription = "In process";
    }

    return {
      ...item,
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

const Brew = () => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const { recipeId } = route.params;
  const [brewData, setBrewData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log("lalala", brewData);
        console.log("Error fetching brew data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewData();
    // }, [userId]);
  }, []);

  useEffect(() => {
    // Fetch the data from the API
    const fetchBrewData = async () => {
      try {
        const recipeId = 652;

        const response = await axios.get(
          `https://brewtothefuture.azurewebsites.net/api/brew/recipe/id/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`, // Include the token in the headers
            },
          }
        );

        setRecipeData(response.data); // Save the fetched data to state
      } catch (error) {
        console.error("Error fetching brew data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewData();
  }, []);

  // useEffect(() => {
  //   // Simulate temperature change
  //   const interval = setInterval(() => {
  //     setTemperature((prevTemp) => (prevTemp >= 100 ? 0 : prevTemp + 10));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (!brewData) {
      const interval = setInterval(() => {
        setBrewData((prevData) =>
          prevData
            ? {
                ...prevData,
                temperature_celsius: prevData.temperature_celsius,
              }
            : null
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
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
        {brewData == null ? (
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

            <TemperatureBar temperature={brewData.current_step} />

            <View style={styles.stopButtonContainer}>
              <TouchableOpacity style={styles.stopButton}>
                <Text style={styles.stopButtonText}>STOP BREWING</Text>
              </TouchableOpacity>
            </View>
            <HorizontalTimeline stepNumber={currentStepNumber} />
          </>
        ) : (
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyText}>
              There is no brewing session occurring right now
            </Text>
            <HorizontalTimeline stepNumber={0} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Brew;
