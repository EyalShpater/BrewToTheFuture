import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Modal,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";
import styles from "./Statistics.style";
import { ID_TOKEN } from "../../utils/idToken.js";

const screenWidth = Dimensions.get("window").width;

const Statistics = () => {
  const navigation = useNavigation();
  const [temperatureData, setTemperatureData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ time: "" });

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await axios.get(
          "https://brewtothefuture.azurewebsites.net/api/brew/data",
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );
        const data = response.data;

        if (data) {
          const timestamps = data.map((item) => item.timestamp);
          const temperatures = data.map((item) => item.temperature_celsius);

          // Convert timestamps to time format (hh:mm)
          const formattedLabels = timestamps.map((ts) => {
            const date = new Date(ts);
            const optionsDate = {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            };
            const optionsTime = {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            };
            const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
            const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);
            return { time: formattedTime, date: formattedDate };
          });

          setTemperatureData(temperatures);
          setLabels(formattedLabels);
        } else {
          console.error("No temperature data available.");
        }
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTemperatureData();
  }, []);

  const handleDataPointClick = (data) => {
    const { index } = data;
    if (index >= 0 && index < labels.length) {
      const { time, date } = labels[index];
      setModalData({
        time,
        date,
      });
      setModalVisible(true);
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

        {temperatureData.length > 0 ? (
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                datasets: [{ data: temperatureData }],
              }}
              width={screenWidth - 30}
              height={350}
              yAxisSuffix="°C"
              chartConfig={{
                backgroundGradientFrom: COLORS.lightOrange,
                backgroundGradientTo: COLORS.darkOrange,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: COLORS.primary,
                },
              }}
              style={{ marginVertical: 10, borderRadius: 16 }}
              onDataPointClick={handleDataPointClick}
            />
            <Text style={[styles.dotsInstructions, { marginTop: 10 }]}>
              Touch the dots to see the time of each temperature
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.emptyChartMessage}>
              There is no brewing happening right now
            </Text>
            <LineChart
              data={{
                datasets: [{ data: [0, 0, 0, 0] }],
              }}
              width={screenWidth - 30}
              height={350}
              yAxisSuffix="°C"
              chartConfig={{
                backgroundGradientFrom: COLORS.lightOrange,
                backgroundGradientTo: COLORS.darkOrange,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: COLORS.primary,
                },
              }}
              style={{ marginVertical: 10, borderRadius: 16 }}
            />
          </>
        )}

        {/* Modal for displaying the time */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalData.date}</Text>
              <Text style={styles.modalText}>{modalData.time}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Statistics;
