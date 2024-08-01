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

  useEffect(() => {
    axios
      .get(
        "https://brewtothefuture.azurewebsites.net/api/brew/recipes/ilwejkrfhiuy4o3y4ljkblkdj"
      )
      .then((response) => {
        console.log("API Response:", response.data); // Log the response data
        setRecipes(response.data); // Assuming the API returns a single recipe object
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
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
                  `\n${index + 1}. Id: ${f.id}, Amount: ${f.amount_kg}kg`
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
                  `\n${index + 1}. Id: ${h.id}, Amount: ${h.amount_g}g, Time: ${
                    h.time_minutes
                  }m`
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
                  `\n${index + 1}. Id: ${y.id}, Temp: ${
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
      label: "Notifications",
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

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Name</Text>
      <Text style={styles.headerText}>Date</Text>
      <Text style={styles.headerText}>Action</Text>
    </View>
  );

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView
      style={[styles.container, { flex: 1, backgroundColor: COLORS.beige }]}
    >
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
                My saved recipes:
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
                <Text style={styles.date}>{item.time_created}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleNavigation("Brew")}
                style={styles.playButton}
              >
                <Text style={styles.playButtonText}>play</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
