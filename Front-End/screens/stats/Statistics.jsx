// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import axios from "axios";
// import styles from "./Statistics.style";
// import { useNavigation } from "@react-navigation/native";
// import { COLORS } from "../../constants";

// // Get the screen width for the chart
// const screenWidth = Dimensions.get("window").width;

// const Statistics = () => {
//   const navigation = useNavigation();
//   const [temperatureData, setTemperatureData] = useState([]);
//   const [timeLabels, setTimeLabels] = useState([]);

//   useEffect(() => {
//     const fetchTemperatureData = async () => {
//       try {
//         const idToken =
//           "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3YjkzOTc3MWE3ODAwYzQxM2Y5MDA1MTAxMmQ5NzU5ODE5MTZkNzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODQ5NTA0ODA0MjQwLWpwbjdodDY3NjFkaGYyNzlidXU4ZmdxZ29mOTBjamUzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODQ5NTA0ODA0MjQwLWpwbjdodDY3NjFkaGYyNzlidXU4ZmdxZ29mOTBjamUzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzMTkyNjA5MTQxOTM4ODIwMDUzIiwiZW1haWwiOiJhZGlrYXAxOTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZG1ra0FYRWN4ZE9CWk9mdmJHODl1QSIsImlhdCI6MTcyNTcxNzY5NywiZXhwIjoxNzI1NzIxMjk3fQ.Bo782meZjYb3R00WlIBqoz0XsbLtWtLIGdH-bBFWXfCfoJ5DKrTupLCNMpxdwUP946sadeUFSwQlA_wotyCi1dUubKSgTifBuw_bZ47ViBWTSn3noRN2f_SrOhbRIs58P3zZ27nbE3X73LkJOiNlz27MesHuX9bzRj7sCCeKIXSeD4L1DFmZ2Hp8YGAlrjrNneN2EhQ5KZigyhc0hh_MjdwgyhqZYfYeOhSvc91HB3Tf0RStl-cmmD5_JDn4YN9ysP7j4ANxREPCGhqa7dUfGBOq7dhrMbUc4yG6eZPCW2MxemJnS-YglDrESnhRqSAwDDHUJFbSDIT1X4EaJIQIHg";
//         const response = await axios.get(
//           "https://brewtothefuture.azurewebsites.net/api/ilwejkrfhiuy4o3y4ljkblkdj/brew/data",
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           }
//         );
//         const data = response.data;

//         if (data && Array.isArray(data)) {
//           const temperatures = data.map((item) => item.temperature_celsius);
//           const timestamps = data.map((item) => item.timestamp);

//           // Convert timestamps from milliseconds to minutes
//           const initialTimestamp = timestamps[0];
//           const timeInMinutes = timestamps.map((timestamp) =>
//             Math.round((timestamp - initialTimestamp) / 60000)
//           );

//           // Limit number of x-axis labels
//           const labelInterval = Math.max(
//             1,
//             Math.floor(timeInMinutes.length / 10)
//           ); // Display at most 10 labels

//           setTemperatureData(temperatures);
//           setTimeLabels(
//             timeInMinutes.filter((_, i) => i % labelInterval === 0)
//           );
//         } else {
//           console.error("No temperature data available.");
//         }
//       } catch (error) {
//         console.error("Error fetching temperature data:", error);
//       }
//     };

//     fetchTemperatureData();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <TouchableOpacity
//           style={styles.returnButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.returnButtonText}>{"< Back"}</Text>
//         </TouchableOpacity>

//         <Text
//           style={[
//             styles.welcomeMessage,
//             { marginTop: 40 },
//             { marginBottom: 30 },
//           ]}
//         >
//           Let's See How The Temperature Changed So Far
//         </Text>

//         <Text style={[styles.instructions, { marginVertical: 20 }]}>
//           Temperature Change Chart:
//         </Text>

//         {temperatureData.length > 0 ? (
//           <LineChart
//             data={{
//               // labels: timeLabels.map((time) => `${time} `),
//               datasets: [{ data: temperatureData }],
//             }}
//             width={screenWidth - 30}
//             height={350}
//             yAxisSuffix="°C"
//             chartConfig={{
//               backgroundGradientFrom: COLORS.lightOrange,
//               backgroundGradientTo: COLORS.darkOrange,
//               decimalPlaces: 0,
//               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               style: { borderRadius: 16 },
//               propsForDots: {
//                 r: "6",
//                 strokeWidth: "2",
//                 stroke: COLORS.primary,
//               },
//             }}
//             style={{ marginVertical: 10, borderRadius: 16 }}
//           />
//         ) : (
//           <>
//             <Text style={styles.emptyChartMessage}>
//               The brewing hasn't started
//             </Text>
//             <LineChart
//               data={{
//                 labels: ["0m", "1m", "2m", "3m"], // example labels for an empty chart
//                 datasets: [{ data: [0, 0, 0, 0] }], // empty data
//               }}
//               width={screenWidth - 30}
//               height={350}
//               yAxisSuffix="°C"
//               chartConfig={{
//                 backgroundGradientFrom: COLORS.lightOrange,
//                 backgroundGradientTo: COLORS.darkOrange,
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 style: { borderRadius: 16 },
//                 propsForDots: {
//                   r: "6",
//                   strokeWidth: "2",
//                   stroke: COLORS.primary,
//                 },
//               }}
//               style={{ marginVertical: 10, borderRadius: 16 }}
//             />
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Statistics;

// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   View,
//   Modal,
//   StyleSheet,
// } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";
// import { COLORS } from "../../constants";
// import styles from "./Statistics.style";

// const screenWidth = Dimensions.get("window").width;

// const Statistics = () => {
//   const navigation = useNavigation();
//   const [temperatureData, setTemperatureData] = useState([]);
//   const [labels, setLabels] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalData, setModalData] = useState({ x: 0, y: 0, time: "" });

//   useEffect(() => {
//     const fetchTemperatureData = async () => {
//       try {
//         const idToken =
//           "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3YjkzOTc3MWE3ODAwYzQxM2Y5MDA1MTAxMmQ5NzU5ODE5MTZkNzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODQ5NTA0ODA0MjQwLWpwbjdodDY3NjFkaGYyNzlidXU4ZmdxZ29mOTBjamUzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODQ5NTA0ODA0MjQwLWpwbjdodDY3NjFkaGYyNzlidXU4ZmdxZ29mOTBjamUzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzMTkyNjA5MTQxOTM4ODIwMDUzIiwiZW1haWwiOiJhZGlrYXAxOTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiQ01NWGZ6MFd4YUVmNHNqaHN1WHhLZyIsImlhdCI6MTcyNTcyMTk4MiwiZXhwIjoxNzI1NzI1NTgyfQ.NdXfgiXPir874kljhhYktWsuiUIUlVxDqP0lTMknuBMkjJBuwohrKLy9X36wvHB52gk2xXW8vl6rvTVA8zSiy54-8z2N6ppW_GilsacYeSvKCJjXNsA9oolMFw0y7rwwqUThSqyMYm-YA202228fZefpRLn_MjkIotyhsciS_laETlvtgV3kImBdcPV77VnNRmDnxJk0d6_oKKsRkuHLwdlFWdRJin2qXNoVdxuesApafYjHGMtj4bfvHG1P_4JO9ycm1L4i3j5iBF_ntU0Ty_XUcNBvb1IeOInRAmfxOIsLtrvf95yOKhGY7HJs-cOq0C2ImfpnuU5WTHFEqQknvg";
//         const response = await axios.get(
//           "https://brewtothefuture.azurewebsites.net/api/ilwejkrfhiuy4o3y4ljkblkdj/brew/data",
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           }
//         );
//         const data = response.data;

//         if (data) {
//           const timestamps = data.map((item) => item.timestamp);
//           const temperatures = data.map((item) => item.temperature_celsius);

//           // Convert timestamps to time format (hh:mm)
//           const formattedLabels = timestamps.map((ts) => {
//             const date = new Date(ts);
//             const hours = date.getUTCHours().toString().padStart(2, "0");
//             const minutes = date.getUTCMinutes().toString().padStart(2, "0");
//             return `${hours}:${minutes}`;
//           });

//           setTemperatureData(temperatures);
//           setLabels(formattedLabels);
//         } else {
//           console.error("No temperature data available.");
//         }
//       } catch (error) {
//         console.error("Error fetching temperature data:", error);
//       }
//     };

//     fetchTemperatureData();
//   }, []);

//   const handleDataPointClick = (data) => {
//     const { index } = data;
//     if (index >= 0 && index < labels.length) {
//       const time = labels[index];
//       setModalData({
//         time,
//       });
//       setModalVisible(true);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Return Button */}
//         <TouchableOpacity
//           style={styles.returnButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.returnButtonText}>{"< Back"}</Text>
//         </TouchableOpacity>

//         <Text
//           style={[
//             styles.welcomeMessage,
//             { marginTop: 40 },
//             { marginBottom: 30 },
//           ]}
//         >
//           Let's See How The Temperature Changed So Far
//         </Text>

//         {/* Temperature Chart */}
//         <Text style={[styles.instructions, { marginVertical: 20 }]}>
//           Temperature Change Chart:
//         </Text>

//         {temperatureData.length > 0 ? (
//           <View style={styles.chartContainer}>
//             <LineChart
//               data={{
//                 datasets: [{ data: temperatureData }],
//               }}
//               width={screenWidth - 30}
//               height={350}
//               yAxisSuffix="°C"
//               chartConfig={{
//                 backgroundGradientFrom: COLORS.lightOrange,
//                 backgroundGradientTo: COLORS.darkOrange,
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 style: { borderRadius: 16 },
//                 propsForDots: {
//                   r: "6",
//                   strokeWidth: "2",
//                   stroke: COLORS.primary,
//                 },
//               }}
//               style={{ marginVertical: 10, borderRadius: 16 }}
//               onDataPointClick={handleDataPointClick}
//             />
//           </View>
//         ) : (
//           <>
//             <Text style={styles.emptyChartMessage}>
//               The brewing hasn't started
//             </Text>
//             <LineChart
//               data={{
//                 datasets: [{ data: [0, 0, 0, 0] }],
//               }}
//               width={screenWidth - 30}
//               height={350}
//               yAxisSuffix="°C"
//               chartConfig={{
//                 backgroundGradientFrom: COLORS.lightOrange,
//                 backgroundGradientTo: COLORS.darkOrange,
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 style: { borderRadius: 16 },
//                 propsForDots: {
//                   r: "6",
//                   strokeWidth: "2",
//                   stroke: COLORS.primary,
//                 },
//               }}
//               style={{ marginVertical: 10, borderRadius: 16 }}
//             />
//           </>
//         )}
//         <Text style={[styles.dotsInstructions, { marginTop: 10 }]}>
//           Touch the dots to see the time
//         </Text>

//         {/* Modal for displaying the time */}
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View
//             style={[
//               styles.modalContainer,
//               { top: modalData.y - 30, left: modalData.x - 50 },
//             ]}
//           >
//             <View style={styles.modalContent}>
//               <Text style={styles.modalText}>{modalData.time}</Text>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default Statistics;

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Modal,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";
import styles from "./Statistics.style";

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
        const idToken =
          "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3YjkzOTc3MWE3ODAwYzQxM2Y5MDA1MTAxMmQ5NzU5ODE5MTZkNzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODQ5NTA0ODA0MjQwLWpwbjdodDY3NjFkaGYyNzlidXU4ZmdxZ29mOTBjamUzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODQ5NTA0ODA0MjQwLWpwbjdodDY3NjFkaGYyNzlidXU4ZmdxZ29mOTBjamUzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzMTkyNjA5MTQxOTM4ODIwMDUzIiwiZW1haWwiOiJhZGlrYXAxOTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiQ01NWGZ6MFd4YUVmNHNqaHN1WHhLZyIsImlhdCI6MTcyNTcyMTk4MiwiZXhwIjoxNzI1NzI1NTgyfQ.NdXfgiXPir874kljhhYktWsuiUIUlVxDqP0lTMknuBMkjJBuwohrKLy9X36wvHB52gk2xXW8vl6rvTVA8zSiy54-8z2N6ppW_GilsacYeSvKCJjXNsA9oolMFw0y7rwwqUThSqyMYm-YA202228fZefpRLn_MjkIotyhsciS_laETlvtgV3kImBdcPV77VnNRmDnxJk0d6_oKKsRkuHLwdlFWdRJin2qXNoVdxuesApafYjHGMtj4bfvHG1P_4JO9ycm1L4i3j5iBF_ntU0Ty_XUcNBvb1IeOInRAmfxOIsLtrvf95yOKhGY7HJs-cOq0C2ImfpnuU5WTHFEqQknvg";
        const response = await axios.get(
          "https://brewtothefuture.azurewebsites.net/api/ilwejkrfhiuy4o3y4ljkblkdj/brew/data",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
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
          </View>
        ) : (
          <>
            <Text style={styles.emptyChartMessage}>
              The brewing hasn't started
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
        <Text style={[styles.dotsInstructions, { marginTop: 10 }]}>
          Touch the dots to see the time of each temperature
        </Text>

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
