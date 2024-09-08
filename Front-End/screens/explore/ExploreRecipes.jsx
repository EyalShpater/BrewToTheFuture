import React, { useState, useEffect } from "react";
import styles from "./Explore.style";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
} from "react-native";
import { ID_TOKEN } from "../../utils/idToken";

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [fermentablesNames, setFermentablesNames] = useState([]);
  const [hopsNames, setHopsNames] = useState([]);
  const [yeastsNames, setYeastsNames] = useState([]);

  // useEffect(() => {
  //   try {
  //     const idToken ="eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3YjkzOTc3MWE3ODAwYzQxM2Y5MDA1MTAxMmQ5NzU5ODE5MTZkNzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODQ5NTA0ODA0MjQwLWpwbjdodDY3NjFkaGYyNzlidXU4ZmdxZ29mOTBjamUzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODQ5NTA0ODA0MjQwLWpwbjdodDY3NjFkaGYyNzlidXU4ZmdxZ29mOTBjamUzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzMTkyNjA5MTQxOTM4ODIwMDUzIiwiZW1haWwiOiJhZGlrYXAxOTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoibVJKX3JDRjQ1cmJQV0NwbTZCSmx5dyIsImlhdCI6MTcyNTcwMzkzOSwiZXhwIjoxNzI1NzA3NTM5fQ.fOTiDRv2vcmoyCf-2OItHl3E3PhzacthmGGVnI6A6sSqXH-3CQPPQCY98lJwYZxuaO4NwitZTr1VxzZK9TY06uhMmdYOVduW75C6PSmAbuN0qdXKHawnKPBf1omKRJ01bcDb39Anpue_q5VbmUs92l7y3QWXTTWnFV_dEbdaOHZ66-8Q0SAHExLSYhvVMxB6V3Z9SQLJI3jhgF5JTbhYjtGmeivh-WisaNp4Veq6qcd2cRve_gI6zeLVzpXk64YWlRJVvnYnD_oLQCtdVKjyXa4NH1tJbyCC6t7goLg8eFdEbUPBLjvciSQwYz4dbaWU-LfkozUGQllhCllw3AXR-A";
  //         const response = await axios.get(
  //           "https://brewtothefuture.azurewebsites.net/api/brew/recipes/all",
  //           {
  //             headers: {
  //               Authorization: `Bearer ${idToken}`,
  //             },
  //           }
  //         );
  //     if (response.data) {
  //       setRecipes(response.data);
  //       setLoading(false);
  //     } else {
  //       console.error("No temperature data available.");
  //     }
  //   } catch {
  //     console.error("Error fetching temperature data:", error);
  //     setLoading(false);
  //   }

  //   // axios
  //   //   .get("https://brewtothefuture.azurewebsites.net/api/brew/recipes/all")
  //   //   .then((response) => {
  //   //     setRecipes(response.data);
  //   //     setLoading(false);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching recipes:", error);
  //   //     setLoading(false);
  //   //   });
  // }, []);

  useEffect(() => {
    // Define the async function
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://brewtothefuture.azurewebsites.net/api/brew/recipe/all",
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );

        if (response.data) {
          setRecipes(response.data);
        } else {
          console.error("No data available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchFermentableNames = async (fermentables) => {
    const namesPromises = fermentables.map((fermentable) =>
      axios
        .get(
          `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/fermentables/${fermentable.id}`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises)
      .then((names) => {
        setFermentablesNames(names);
        return names;
      })
      .catch((error) => {
        console.error("Error fetching fermentable names:", error);
      });
  };

  const fetchHopsNames = async (hops) => {
    const namesPromises = hops.map((hop) =>
      axios
        .get(
          `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/hops/${hop.id}`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises)
      .then((names) => {
        setHopsNames(names);
        return names;
      })
      .catch((error) => {
        console.error("Error fetching hops names:", error);
      });
  };

  const fetchYeastNames = async (yeasts) => {
    const namesPromises = yeasts.map((yeast) =>
      axios
        .get(
          `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/yeasts/${yeast.id}`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises)
      .then((names) => {
        setYeastsNames(names);
        return names;
      })
      .catch((error) => {
        console.error("Error fetching yeast names:", error);
      });
  };

  const openModal = (recipe) => {
    setLoading(true); // Set loading to true while fetching data
    Promise.all([
      fetchFermentableNames(recipe.fermentables),
      fetchHopsNames(recipe.hops),
      fetchYeastNames(recipe.yeast),
    ])
      .then(() => {
        setSelectedRecipe(recipe);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching ingredient names:", error);
        setLoading(false); // Set loading to false in case of error
      });
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const renderRecipeDetail = ({ item }) => (
    <Text style={styles.field}>
      <Text style={styles.fieldLabel}>{item.label}:</Text> {item.value}
    </Text>
  );

  const getRecipeDetails = (recipe) => [
    { label: "Name", value: recipe.recipe_name },
    { label: "Method", value: recipe.method },
    { label: "Style", value: recipe.style },
    { label: "ABV", value: `${recipe.abv}%` },
    { label: "IBU", value: recipe.ibu },
    { label: "Original Gravity", value: recipe.original_gravity },
    { label: "Final Gravity", value: recipe.final_gravity },
    { label: "Color", value: recipe.color },
    {
      label: "Batch Size",
      value: `${recipe.batch_size_liter}L`,
    },
    {
      label: "Fermentables",
      value:
        Array.isArray(recipe.fermentables) && recipe.fermentables.length
          ? recipe.fermentables
              .map(
                (f, index) =>
                  `\n${index + 1}. Name: ${fermentablesNames[index]}, Amount: ${
                    f.amount_kg
                  }kg`
              )
              .join("")
          : "N/A",
    },
    {
      label: "Hops",
      value:
        Array.isArray(recipe.hops) && recipe.hops.length
          ? recipe.hops
              .map(
                (h, index) =>
                  `\n${index + 1}. Name: ${hopsNames[index]}, Amount: ${
                    h.amount_g
                  }g, Time: ${h.time_minutes}m`
              )
              .join("")
          : "N/A",
    },
    {
      label: "Yeast",
      value:
        Array.isArray(recipe.yeast) && recipe.yeast.length
          ? recipe.yeast
              .map(
                (y, index) =>
                  `\n${index + 1}. Name: ${yeastsNames[index]}, Temp: ${
                    y.temperature_celsius
                  }°C`
              )
              .join("")
          : "N/A",
    },
    {
      label: "Steps",
      value:
        Array.isArray(recipe.recipe) && recipe.recipe.length
          ? recipe.recipe
              .map(
                (step) =>
                  `\nStep ${step.step_id}: ${step.message || "No message"}`
              )
              .join("")
          : "N/A",
    },
    {
      label: "Fermentation steps",
      value:
        Array.isArray(recipe.notifications) && recipe.notifications.length
          ? recipe.notifications
              .map(
                (note, index) =>
                  `\n${index + 1}. ${note.message} (after ${
                    note.send_after_days
                  } days)`
              )
              .join("")
          : "N/A",
    },
  ];

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // This will return the date and time in a readable format
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
          Let's Discover Exciting New Beer Recipes!
        </Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          recipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dataContainer}
              onPress={() => openModal(recipe)}
            >
              <Text style={styles.recipeName}>
                Beer name: {recipe.recipe_name}{" "}
              </Text>
              <Text style={styles.date}>
                Creation date: {convertTimestampToDate(recipe.time_created)}
              </Text>
              <Text style={styles.recipeName}>Created by: Adi Kapuri</Text>
              <Text style={styles.touchOrder}>Touch to see more details</Text>
            </TouchableOpacity>
          ))
        )}

        {selectedRecipe && (
          <Modal
            visible={!!selectedRecipe}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <Text style={styles.modalTitle}>Recipe Details:</Text>
                  <FlatList
                    data={getRecipeDetails(selectedRecipe)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderRecipeDetail}
                  />
                  <Button title="Close" onPress={closeModal} />
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
  // <SafeAreaView>
  //   <ScrollView contentContainerStyle={styles.container}>
  //     {/* Return Button */}
  //     <TouchableOpacity
  //       style={styles.returnButton}
  //       onPress={() => navigation.goBack()}
  //     >
  //       <Text style={styles.returnButtonText}>{"< Back"}</Text>
  //     </TouchableOpacity>
  //     <Text style={[styles.welcomeMessage, { marginTop: 20 }]}>
  //       Let's Discover Exciting New Beer Recipes!
  //     </Text>
  //   </ScrollView>
  // </SafeAreaView>
  // );
};

export default ExploreRecipes;
