import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./CreateRecipe.style";
import { COLORS } from "../../constants";

const CreateRecipeOne = () => {
  const userId = "ilwejkrfhiuy4o3y4ljkblkdj";
  const [recipeName, setRecipeName] = useState("");
  const [method, setMethod] = useState("");
  const [style, setStyle] = useState("");
  const [abv, setAbv] = useState("");
  const [ibu, setIbu] = useState("");
  const [originalGravity, setOriginalGravity] = useState("");
  const [finalGravity, setFinalGravity] = useState("");
  const [color, setColor] = useState("");
  const [batchSizeLiter, setBatchSizeLiter] = useState("");
  const navigation = useNavigation();

  const getRecipeName = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recipe name:</Text>
          <TextInput
            style={styles.input}
            value={recipeName}
            onChangeText={(text) => setRecipeName(text)}
          />
        </View>
      </View>
    );
  };

  const getMethod = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Method:</Text>
        <TextInput
          style={styles.input}
          value={method}
          onChangeText={(text) => setMethod(text)}
        />
      </View>
    );
  };

  const getStyle = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Style:</Text>
        <TextInput
          style={styles.input}
          value={style}
          onChangeText={(text) => setStyle(text)}
        />
      </View>
    );
  };

  const getABV = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ABV:</Text>
        <TextInput
          style={styles.input}
          value={abv}
          onChangeText={(text) => setAbv(text)}
        />
      </View>
    );
  };

  const getIBU = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>IBU:</Text>
        <TextInput
          style={styles.input}
          value={ibu}
          onChangeText={(text) => setIbu(text)}
        />
      </View>
    );
  };

  const getOriginalGravity = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Original Gravity:</Text>
        <TextInput
          style={styles.input}
          value={originalGravity}
          onChangeText={(text) => setOriginalGravity(text)}
        />
      </View>
    );
  };

  const getFinalGravity = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Final Gravity:</Text>
        <TextInput
          style={styles.input}
          value={finalGravity}
          onChangeText={(text) => setFinalGravity(text)}
        />
      </View>
    );
  };

  const getColor = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Color:</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={(text) => setColor(text)}
        />
      </View>
    );
  };

  const getBatchSize = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Batch Size (L):</Text>
        <TextInput
          style={styles.input}
          value={batchSizeLiter}
          onChangeText={(text) => setBatchSizeLiter(text)}
        />
      </View>
    );
  };

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName, {
      userId,
      recipeName,
      method,
      style,
      abv,
      ibu,
      originalGravity,
      finalGravity,
      color,
      batchSizeLiter,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backGround }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeMessage}>
          Let's craft your perfect brew!
        </Text>
        <Text style={styles.instructions}>Edit your recipe below:</Text>
        {getRecipeName()}
        {getMethod()}
        {getStyle()}
        {getABV()}
        {getIBU()}
        {getOriginalGravity()}
        {getFinalGravity()}
        {getColor()}
        {getBatchSize()}

        {/* Next Page Button */}
        <TouchableOpacity
          onPress={() => handleNavigation("CreateRecipeTwo")}
          style={styles.nextPageButton}
        >
          <Text style={styles.nextPageButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateRecipeOne;
