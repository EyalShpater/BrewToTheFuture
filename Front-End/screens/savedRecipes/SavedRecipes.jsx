import React, { useState, useEffect } from "react";
import styles from "./SavedRecipes.style";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  FlatList,
  ScrollView,
} from "react-native";

const SavedRecipes = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fermentablesNames, setFermentablesNames] = useState([]);
  const [hopsNames, setHopsNames] = useState([]);
  const [yeastsNames, setYeastsNames] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://brewtothefuture.azurewebsites.net/api/brew/recipes/ilwejkrfhiuy4o3y4ljkblkdj"
      )
      .then((response) => {
        setRecipes(response.data); // Assuming the API returns a single recipe object
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const fetchFermentableNames = (fermentables) => {
    const namesPromises = fermentables.map((fermentable) =>
      axios
        .get(
          `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/fermentables/${fermentable.id}`
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises).then((names) => {
      setFermentablesNames(names);
      return names;
    });
  };

  const fetchHopsNames = (hops) => {
    const namesPromises = hops.map((hop) =>
      axios
        .get(
          `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/hops/${hop.id}`
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises).then((names) => {
      setHopsNames(names);
      return names;
    });
  };

  const fetchYeastNames = (yeasts) => {
    const namesPromises = yeasts.map((yeast) =>
      axios
        .get(
          `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/yeasts/${yeast.id}`
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises).then((names) => {
      setYeastsNames(names);
      return names;
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

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://brewtothefuture.azurewebsites.net/api/brew/recipes/ilwejkrfhiuy4o3y4ljkblkdj"
  //     )
  //     .then(async (response) => {
  //       setRecipes(response.data); // Assuming the API returns a single recipe object
  //       {
  //         console.log("");
  //       }
  //       await fetchFermentableNames(recipes[0].fermentables);
  //       await fetchHopsNames(recipes[0].hops);
  //       await fetchYeastNames(recipes[0].yeast);
  //       setLoading(false); // Set loading to false once data is fetched
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoading(false); // Set loading to false in case of error
  //     });
  // }, []);

  // const fetchFermentableNames = async (fermentables) => {
  //   try {
  //     const namesPromises = fermentables.map(async (fermentable) => {
  //       const response = await axios.get(
  //         `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/fermentables/${fermentable.id}`
  //       );

  //       return response.data.name; // Assuming the response contains a `name` field
  //     });

  //     const names = await Promise.all(namesPromises);
  //     setFermentablesNames(names);
  //   } catch (error) {
  //     console.error("Error fetching fermentable names:", error);
  //   }
  // };

  // const fetchHopsNames = async (hops) => {
  //   try {
  //     const namesPromises = hops.map(async (hop) => {
  //       const response = await axios.get(
  //         `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/hops/${hop.id}`
  //       );

  //       return response.data.name; // Assuming the response contains a `name` field
  //     });

  //     const names = await Promise.all(namesPromises);
  //     setHopsNames(names);
  //   } catch (error) {
  //     console.error("Error fetching hops names:", error);
  //   }
  // };

  // const fetchYeastNames = async (yeasts) => {
  //   try {
  //     const namesPromises = yeasts.map(async (yeast) => {
  //       const response = await axios.get(
  //         `https://brewtothefuture.azurewebsites.net/api/brew/ingredients/yeasts/${yeast.id}`
  //       );

  //       return response.data.name; // Assuming the response contains a `name` field
  //     });

  //     const names = await Promise.all(namesPromises);
  //     setYeastsNames(names);
  //   } catch (error) {
  //     console.error("Error fetching Yeasts names:", error);
  //   }
  // };

  // const openModal = async (recipe) => {
  //   setSelectedRecipe(recipe);
  //   {
  //     console.log(recipe);
  //   }
  //   await fetchFermentableNames(recipe.fermentables);
  //   await fetchHopsNames(recipe.hops);
  //   await fetchYeastNames(recipe.yeast);
  // };
  // const openModal = async (recipe) => {
  //   setLoading(true); // Set loading to true while fetching data
  //   await fetchFermentableNames(recipe.fermentables);
  //   await fetchHopsNames(recipe.hops);
  //   await fetchYeastNames(recipe.yeast);
  //   setSelectedRecipe(recipe);
  //   setLoading(false); // Set loading to false once data is fetched
  // };

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

  const handleDelete = (userId, recipeId) => {
    axios
      .delete(
        `https://brewtothefuture.azurewebsites.net/api/${userId}/brew/recipe/${recipeId}`
      )
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId)
        );
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.nameHeader}>Name</Text>
      <Text style={styles.dateHeader}>Date</Text>
      <Text style={styles.actionHeader}>Action</Text>
    </View>
  );

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // This will return the date and time in a readable format
  };

  const handlePlayPress = (userId, recipeId) => {
    axios
      .post(
        `https://brewtothefuture.azurewebsites.net/api/${userId}/brew/recipe/${recipeId}`
      )
      .then((response) => {
        console.log("POST request successful:", response.data);

        navigation.navigate("Brew");
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      {/* Return Button */}
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.returnButtonText}>{"< Back"}</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item, index) => index.toString()} // Use index as a fallback
          ListHeaderComponent={
            <>
              <Text
                style={[
                  styles.welcomeMessage,
                  { marginTop: 40 },
                  { marginBottom: 30 },
                ]}
              >
                My Saved Recipes:
              </Text>
              {renderHeader()}
            </>
          }
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => openModal(item)}
                style={styles.nameContainer}
              >
                <View style={styles.nameRow}>
                  <Text style={styles.recipeName}>{index + 1}. </Text>
                  <Text style={[styles.recipeName, styles.underlineText]}>
                    {item.recipe_name}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.date}>
                  {convertTimestampToDate(item.time_created)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePlayPress(item.user_id, item.recipe_id)}
                style={styles.playButton}
              >
                <Text style={styles.playButtonText}>play</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.user_id, item.recipe_id)}
                style={styles.deleteButton}
              >
                <Text style={styles.playButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {selectedRecipe && !loading && (
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
                  keyExtractor={(item, index) => index.toString()} // Use index as a fallback
                  renderItem={renderRecipeDetail}
                />
                <Button title="Close" onPress={closeModal} />
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default SavedRecipes;
