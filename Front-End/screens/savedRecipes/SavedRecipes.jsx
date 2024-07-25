import React, { useState } from "react";
import styles from "./SavedRecipes.style";
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Button,
  FlatList,
} from "react-native";

const recipes = [
  {
    id: "1",
    name: "malka",
    date: "24-07-2024",
    method: "Method 1",
    style: "Style 1",
    abv: "5%",
    ibu: "15",
    originalGravity: "1.050",
    finalGravity: "1.010",
    color: "Golden",
    batchSize: "20L",
    fermentables: "Fermentable 1, Fermentable 2",
    hops: "Hop 1, Hop 2",
    yeast: "Yeast 1",
    steps: "Step 1, Step 2",
  },
  {
    id: "2",
    name: "luma",
    date: "24-07-2024",
    method: "Method 1",
    style: "Style 1",
    abv: "5%",
    ibu: "15",
    originalGravity: "1.050",
    finalGravity: "1.010",
    color: "Golden",
    batchSize: "20L",
    fermentables: "Fermentable 1, Fermentable 2",
    hops: "Hop 1, Hop 2",
    yeast: "Yeast 1",
    steps: "Step 1, Step 2",
  },
];

const SavedRecipes = () => {
  const navigation = useNavigation();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
    { label: "Name", value: recipe.name },
    { label: "Date", value: recipe.date },
    { label: "Method", value: recipe.method },
    { label: "Style", value: recipe.style },
    { label: "ABV", value: recipe.abv },
    { label: "IBU", value: recipe.ibu },
    { label: "Original Gravity", value: recipe.originalGravity },
    { label: "Final Gravity", value: recipe.finalGravity },
    { label: "Color", value: recipe.color },
    { label: "Batch Size", value: recipe.batchSize },
    { label: "Fermentables", value: recipe.fermentables },
    { label: "Hops", value: recipe.hops },
    { label: "Yeast", value: recipe.yeast },
    { label: "Steps", value: recipe.steps },
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
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
          My saved recipes:
        </Text>

        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => openModal(item)}
                style={styles.nameContainer}
              >
                <View style={styles.nameRow}>
                  <Text style={styles.recipeName}>{index + 1}. </Text>
                  <Text style={[styles.recipeName, styles.underlineText]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleNavigation("brew")}
                style={styles.playButton}
              >
                <Text style={styles.playButtonText}>play</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {selectedRecipe && (
          <Modal
            visible={!!selectedRecipe}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Recipe Details:</Text>
                <FlatList
                  data={getRecipeDetails(selectedRecipe)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderRecipeDetail}
                />
                <Button title="Close" onPress={closeModal} />
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedRecipes;
