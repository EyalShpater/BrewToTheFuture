import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./CreateRecipe.style";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { images } from "../../constants";

const CreateRecipeThree = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [step, setSteps] = useState([
    {
      step_id: 1,
      temperature_celsius: 0.0,
      duration_minutes: 0.0,
      notify_on_completion: false,
      message: "",
    },
  ]);
  const [notifySwitches, setNotifySwitches] = useState(step.map(() => false));

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
  //   yeastDetails,
  //   hopsDetails,
  // } = route.params;

  const renderSteps = () => {
    return step.map((step) => (
      <View key={step.step_id} style={styles.stepContainer}>
        <Text style={[styles.instructions, { marginBottom: 20 }]}>
          Step {step.step_id}:
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Temperature (°C):</Text>
          <TextInput
            style={styles.input}
            value={step.temperature_celsius}
            onChangeText={(text) =>
              handleStepChange(
                step.step_id,
                "temperature_celsius",
                parseFloat(text)
              )
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Duration (minutes):</Text>
          <TextInput
            style={styles.input}
            value={step.duration_minutes}
            onChangeText={(text) =>
              handleStepChange(
                step.step_id,
                "duration_minutes",
                parseFloat(text)
              )
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enable Notification:</Text>
          <Switch
            value={notifySwitches[step.step_id - 1]}
            onValueChange={(value) =>
              handleNotifySwitchChange(step.step_id, value)
            }
          />
        </View>
        {renderNotifyField(step.step_id)}
      </View>
    ));
  };

  const handleNotifySwitchChange = (stepId, value) => {
    const updatedNotifySwitches = [...notifySwitches];
    updatedNotifySwitches[stepId - 1] = value;

    const updatedSteps = step.map((step) =>
      step.step_id === stepId ? { ...step, notify_on_completion: value } : step
    );
    setNotifySwitches(updatedNotifySwitches);
    setSteps(updatedSteps);
  };

  const renderNotifyField = (stepId) => {
    return notifySwitches[stepId - 1] ? (
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>What to notify when step ends:</Text>
          <TextInput
            style={styles.input}
            value={step[stepId - 1].message}
            onChangeText={(text) => {
              handleStepChange(stepId, "message", text);
            }}
          />
        </View>
      </View>
    ) : null;
  };

  const addStep = () => {
    const newStepId = step.length + 1;
    setSteps([
      ...step,
      {
        step_id: newStepId,
        temperature_celsius: 0.0,
        duration_minutes: 0.0,
        notify_on_completion: false,
        message: "",
      },
    ]);
  };

  const handleStepChange = (id, field, value) => {
    const updatedSteps = step.map((step) =>
      step.step_id === id ? { ...step, [field]: value } : step
    );
    setSteps(updatedSteps);
  };

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName, {
      // userId: route.params.userId,
      recipeName: route.params.recipeName,
      method: route.params.method,
      style: route.params.style,
      abv: route.params.abv,
      ibu: route.params.ibu,
      originalGravity: route.params.originalGravity,
      finalGravity: route.params.finalGravity,
      color: route.params.color,
      batchSizeLiter: route.params.batchSizeLiter,
      fermentableDetails: route.params.fermentableDetails,
      yeastDetails: route.params.yeastDetails,
      hopsDetails: route.params.hopsDetails,
      steps: step,
    });
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
            Add step for the brewing process:
          </Text>

          {renderSteps()}

          {/* Next Step Button */}
          <TouchableOpacity onPress={addStep} style={styles.AddStepButton}>
            <Text style={styles.AddStepButtonText}>+Add Step</Text>
          </TouchableOpacity>

          {/* Next Page Button */}
          <View style={{ marginVertical: 80 }} />
          <TouchableOpacity
            onPress={() => handleNavigation("CreateRecipeFour")}
            style={styles.nextPageButton}
          >
            <Text style={styles.nextPageButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CreateRecipeThree;
