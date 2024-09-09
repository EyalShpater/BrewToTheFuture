import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./CreateRecipe.style";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { images } from "../../constants";
import axios from "axios";
import { ID_TOKEN } from "../../utils/idToken.js";

const CreateRecipeFour = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [notifications, setNotifications] = useState([
    {
      message: "",
      send_after_days: 0,
    },
  ]);

  // const {
  //   userId,
  //   recipeName,
  //   method,
  //   style,
  //   abv,
  //   ibu,
  //   originalGravity,
  //   finalGravity,
  //   color,
  //   batchSizeLiter,
  //   fermentableDetails,
  //   hopsDetails,
  //   yeastDetails,
  //   steps,
  // } = route.params;

  const renderNotifications = () => {
    return notifications.map((notification, index) => (
      <View key={index} style={styles.stepContainer}>
        <Text style={[styles.instructions, { marginBottom: 20 }]}>
          Message {index + 1}:
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Message:</Text>
          <TextInput
            style={styles.input}
            value={notification.message}
            onChangeText={(text) => handleInputChange(index, "message", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of days to sent after:</Text>
          <TextInput
            style={styles.input}
            value={notification.send_after_days}
            onChangeText={(text) =>
              handleInputChange(index, "send_after_days", parseFloat(text))
            }
          />
        </View>
      </View>
    ));
  };

  const handleAddNotification = () => {
    setNotifications([...notifications, { message: "", send_after_days: 0 }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index][field] = value;
    setNotifications(updatedNotifications);
  };

  const handleSubmit = async () => {
    const recipeObj = {
      user_id: route.params.userId,
      recipe_name: route.params.recipeName,
      method: route.params.method,
      style: route.params.style,
      abv: parseFloat(route.params.abv),
      ibu: parseFloat(route.params.ibu),
      original_gravity: parseFloat(route.params.originalGravity),
      final_gravity: parseFloat(route.params.finalGravity),
      color: parseFloat(route.params.color),
      batch_size_liter: parseFloat(route.params.batchSizeLiter),
      recipe: route.params.steps,
      notifications: notifications,
      fermentables: route.params.fermentableDetails,
      hops: route.params.hopsDetails,
      yeast: route.params.yeastDetails,
    };
    console.log(recipeObj);

    const url =
      "http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/recipe/add";

    try {
      const response = await axios.post(url, recipeObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ID_TOKEN}`,
        },
      });

      if (response.status == 200) {
        console.log("Recipe created successfully!");
        console.log(response.data);
      } else {
        console.error(`Error: ${response.status}`);
        console.error(response.data, error.message);
      }
    } catch (error) {
      console.error("Error:", error, error.message);
    }
  };

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground
      source={images.beerBackground}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView>
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
              styles.instructions,
              { marginBottom: 10 },
              { marginTop: 30 },
            ]}
          >
            Add message for the fermentation process:
          </Text>
          {renderNotifications()}
          <TouchableOpacity
            onPress={handleAddNotification}
            style={styles.AddStepButton}
          >
            <Text style={styles.AddStepButtonText}>
              +Add fermentation message
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <View style={{ marginVertical: 75 }} />
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.saveRecipeButton}
          >
            <Text style={styles.nextPageButtonText}>Save Recipe</Text>
          </TouchableOpacity>

          {/* Back To Main Screen */}
          <TouchableOpacity
            onPress={() => handleNavigation("Welcome")}
            style={styles.nextPageButton}
          >
            <Text style={styles.nextPageButtonText}>Back To Main Menu</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CreateRecipeFour;
