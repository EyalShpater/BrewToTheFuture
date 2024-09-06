import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import styles from "./Statistics.style";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";

// Get the screen width for the chart
const screenWidth = Dimensions.get("window").width;

const Statistics = () => {
  const navigation = useNavigation();
  const [temperatureData, setTemperatureData] = useState([]);

  // Function to fetch temperature data
  const fetchTemperatureData = async () => {
    try {
      const response = await axios.get(
        "https://brewtothefuture.azurewebsites.net/api/ilwejkrfhiuy4o3y4ljkblkdj/brew/data"
      );
      const data = response.data;

      // Extract temperature_celsius from the array of objects
      const temperatures = data.map((item) => item.temperature_celsius);

      // Update the temperature data state
      setTemperatureData(temperatures);
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }

    // Fetch the temperature data every 15 seconds
    // useEffect(() => {
    //   fetchTemperatureData(); // Initial fetch

    //   const interval = setInterval(fetchTemperatureData, 15000); // Fetch every 15 seconds

    //   return () => clearInterval(interval); // Cleanup on unmount
    // }, []);
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
            { marginTop: 40 },
            { marginBottom: 30 },
          ]}
        >
          Let's See How The Temperature Changed So Far
        </Text>

        {/* Temperature Chart */}
        <Text style={[styles.instructions, { marginVertical: 20 }]}>
          Temperature Change Chart:
        </Text>

        <LineChart
          data={{
            labels: temperatureData.map((temp, index) => `${index} sec`), // Label with time or index
            datasets: [
              {
                data: temperatureData,
              },
            ],
          }}
          width={screenWidth - 40} // from Dimensions
          height={300}
          yAxisSuffix="°C"
          yAxisInterval={10} // optional, defaults to 1
          chartConfig={{
            backgroundColor: COLORS.darkOrange,
            backgroundGradientFrom: COLORS.lightOrange,
            backgroundGradientTo: COLORS.darkOrange,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          style={{
            marginVertical: 10,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Statistics;
