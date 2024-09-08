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

// const data = [
//   {
//     key: "1",
//     title: "Step 1 - Brew Day",
//     description: "In process...",
//   },
//   {
//     key: "2",
//     title: "Step 2 - Fermentation",
//     description: "Not started yet",
//   },
//   {
//     key: "3",
//     title: "Step 3 - Bottling",
//     description: "Not started yet",
//   },
// ];

// const HorizontalTimeline = ({ stepNumber }) => {
//   const updatedData = data.map((item) => {
//     let newDescription = "Not started yet";

//     if (parseInt(item.key) < stepNumber) {
//       newDescription = "Done";
//     } else if (parseInt(item.key) === stepNumber) {
//       newDescription = "In process";
//     }

//     return {
//       ...item,
//       description: newDescription,
//     };
//   });

//   return (
//     <SafeAreaView>
//       <FlatList
//         data={updatedData}
//         renderItem={({ item }) => <TimelineItem item={item} />}
//         keyExtractor={(item) => item.key}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.contentContainer}
//       />
//     </SafeAreaView>
//   );
// };

// const Brew = () => {
//   const navigation = useNavigation();
//   const [brewData, setBrewData] = useState([]);
//   const [recipeData, setRecipeData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBrewData = async () => {
//       try {
//         // First GET request to fetch the latest brew data
//         const response = await axios.get(
//           `https://brewtothefuture.azurewebsites.net/api/brew/data/latest`,
//           {
//             headers: {
//               Authorization: `Bearer ${ID_TOKEN}`,
//             },
//           }
//         );

//         const brewDataResponse = response.data;
//         setBrewData(brewDataResponse); // Set brewData after the first request completes

//         // Check if recipe_id exists before making the second request
//         if (brewDataResponse.recipe_id) {
//           // Second GET request to fetch recipe data using recipe_id from the first response
//           const recipeResponse = await axios.get(
//             `https://brewtothefuture.azurewebsites.net/api/brew/recipe/id/${brewDataResponse.recipe_id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${ID_TOKEN}`, // Include the token in the headers
//               },
//             }
//           );

//           setRecipeData(recipeResponse.data); // Set the fetched recipe data
//         }
//       } catch (error) {
//         console.error("Error fetching brew or recipe data:", error);
//       } finally {
//         setLoading(false); // Stop loading after both requests are completed
//       }
//     };

//     fetchBrewData();
//   }, []);

//   // useEffect(() => {
//   //   // Simulate temperature change
//   //   const interval = setInterval(() => {
//   //     setTemperature((prevTemp) => (prevTemp >= 100 ? 0 : prevTemp + 10));
//   //   }, 1000);

//   //   return () => clearInterval(interval);
//   // }, []);

//   useEffect(() => {
//     if (!brewData) {
//       const interval = setInterval(() => {
//         setBrewData((prevData) =>
//           prevData
//             ? {
//                 ...prevData,
//                 temperature_celsius: prevData.temperature_celsius,
//               }
//             : null
//         );
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, []);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   // if (!brewData) {
//   //   return (
//   //     <SafeAreaView style={styles.container}>
//   //       <Text>No data available</Text>
//   //     </SafeAreaView>
//   //   );
//   // }

//   const calculateTimeDifference = (stepStartTime) => {
//     const currentTime = Date.now();
//     const timeDifference = currentTime - stepStartTime;

//     const date = new Date(timeDifference);

//     // Extract hours and minutes from the Date object
//     const hours = date.getUTCHours(); // Use getUTCHours to handle the difference correctly
//     const minutes = date.getUTCMinutes(); // Use getUTCMinutes for consistent time

//     // Return the formatted time as a string
//     return `${hours}h ${minutes}m`;
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
//             { marginTop: 30 },
//             { marginBottom: 30 },
//           ]}
//         >
//           Currently Brewing:
//         </Text>
//         {brewData != null ? (
//           <>
//             <View style={styles.dataContainer}>
//               <Text style={styles.instructions}>
//                 Beer name: {recipeData.recipe_name}
//               </Text>
//             </View>
//             <View style={styles.dataContainer}>
//               <Text style={styles.instructions}>
//                 Current step: {brewData.current_step}
//               </Text>
//             </View>
//             <View style={styles.dataContainer}>
//               <Text style={styles.instructions}>
//                 Time passed: {calculateTimeDifference(brewData.step_start_time)}
//               </Text>
//             </View>
//             <Text style={styles.instructions}> Current temperature: </Text>

//             <TemperatureBar
//               temperature={brewData.temperature_celsius.toFixed(2)}
//             />

//             <View style={styles.stopButtonContainer}>
//               <TouchableOpacity style={styles.stopButton}>
//                 <Text style={styles.stopButtonText}>STOP BREWING</Text>
//               </TouchableOpacity>
//             </View>
//             <HorizontalTimeline stepNumber={brewData.current_step} />
//           </>
//         ) : (
//           <View style={styles.emptyTextContainer}>
//             <Text style={styles.emptyText}>
//               There is no brewing session occurring right now
//             </Text>
//             <HorizontalTimeline stepNumber={0} />
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Brew;

const HorizontalTimeline = ({ stepNumber, recipe }) => {
  const updatedData = recipe.map((item, index) => {
    let newDescription = "Not started yet";

    if (index + 1 < stepNumber) {
      newDescription = "Done";
    } else if (index + 1 === stepNumber) {
      newDescription = "In process";
    }

    let newTitle;

    if (item.message == null) {
      newTitle = `Step ${index + 1} - Temperature Rest`;
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
          `https://brewtothefuture.azurewebsites.net/api/brew/data/latest`,
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
            `https://brewtothefuture.azurewebsites.net/api/brew/recipe/id/${brewDataResponse.recipe_id}`,
            {
              headers: {
                Authorization: `Bearer ${ID_TOKEN}`,
              },
            }
          );

          setRecipeData(recipeResponse.data);
        }
      } catch (error) {
        console.error("Error fetching brew or recipe data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewData();
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
        {brewData != null ? (
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
              <TouchableOpacity style={styles.stopButton}>
                <Text style={styles.stopButtonText}>STOP BREWING</Text>
              </TouchableOpacity>
            </View>
            {console.log(recipeData.recipe)}

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
