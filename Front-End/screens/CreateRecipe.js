import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
  Switch,
} from "react-native";
import styles from "./CreateRecipe.style";
import { Picker } from "@react-native-picker/picker";
// const axios = require("axios");
import axios from "axios";

const CreateRecipe = () => {
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
  const [fermentables, setFermentables] = useState(0);
  const [isFermentablesPickerVisible, setIsFermentablesPickerVisible] =
    useState(false);
  const [fermentableDetails, setFermentableDetails] = useState([
    {
      id: 0,
      amount_kg: 0,
    },
  ]);
  const [hops, setHops] = useState(0);
  const [isHopsPickerVisible, setIsHopsPickerVisible] = useState(false);
  const [hopsDetails, setHopsDetails] = useState([
    {
      id: 0,
      amount_kg: 0,
      time_minutes: 0,
    },
  ]);
  const [yeast, setYeast] = useState(0);
  const [isYeastPickerVisible, setIsYeastPickerVisible] = useState(false);
  const [yeastDetails, setYeastDetails] = useState([
    {
      id: 0,
      temperature_celsius: 0,
    },
  ]);
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
  const [notifications, setNotifications] = useState([
    {
      message: "",
      send_after_days: 0,
    },
  ]);

  const handleFermentablesPickerSelect = (value) => {
    setFermentables(value);
    setIsFermentablesPickerVisible(false);
    setFermentableDetails(
      Array.from({ length: value }, () => ({ id: 0, amount_kg: 0 }))
    );
  };

  const handleHopsPickerSelect = (value) => {
    setHops(value);
    setIsHopsPickerVisible(false);
    setHopsDetails(
      Array.from({ length: value }, () => ({
        id: 0,
        amount_kg: 0,
        time_minutes: 0,
      }))
    );
  };

  const handleYeastPickerSelect = (value) => {
    setYeast(value);
    setIsYeastPickerVisible(false);
    setYeastDetails(
      Array.from({ length: value }, () => ({ id: 0, temperature_celsius: 0 }))
    );
  };

  const handleFermentableChange = (index, field, value) => {
    const updatedFermentableDetails = fermentableDetails.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setFermentableDetails(updatedFermentableDetails);
  };

  const handleHopsChange = (index, field, value) => {
    const updatedHopsDetails = hopsDetails.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setHopsDetails(updatedHopsDetails);
  };

  const handleYeastChange = (index, field, value) => {
    const updatedYeastDetails = yeastDetails.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setYeastDetails(updatedYeastDetails);
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

  const fermentablesPicker = () => {
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsFermentablesPickerVisible(true)}
        >
          <Text style={styles.label}>Fermentables:</Text>
          <TextInput
            style={styles.input}
            value={String(fermentables)}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const modalForFermentablesPicker = () => {
    return (
      <Modal
        visible={isFermentablesPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fermentables}
              onValueChange={(itemValue) =>
                handleFermentablesPickerSelect(itemValue)
              }
              style={styles.picker}
            >
              {[...Array(11).keys()].map((item) => (
                <Picker.Item key={item} label={String(item)} value={item} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setIsFermentablesPickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const getFermentableDetails = () => {
    if (fermentables > 0) {
      return fermentableDetails.map((_, index) => (
        <View key={index} style={{ marginTop: 2 }}>
          <Text style={[styles.fermentableTitle, styles.underlineText]}>
            Fermentable {index + 1}:
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Grain Type:</Text>
            <TextInput
              style={styles.input}
              value={fermentableDetails[index].id}
              onChangeText={(text) =>
                handleFermentableChange(index, "id", parseInt(text))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount (kg):</Text>
            <TextInput
              style={styles.input}
              value={fermentableDetails[index].amount_kg}
              onChangeText={(text) =>
                handleFermentableChange(index, "amount_kg", parseFloat(text))
              }
            />
          </View>
        </View>
      ));
    } else {
      return null;
    }
  };

  const hopsPicker = () => {
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsHopsPickerVisible(true)}
        >
          <Text style={styles.label}>Hops:</Text>
          <TextInput
            style={styles.input}
            value={String(hops)}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const modalForHopsPicker = () => {
    return (
      <Modal
        visible={isHopsPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={hops}
              onValueChange={(itemValue) => handleHopsPickerSelect(itemValue)}
              style={styles.picker}
            >
              {[...Array(11).keys()].map((item) => (
                <Picker.Item key={item} label={String(item)} value={item} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setIsHopsPickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const getHopsDetails = () => {
    if (hops > 0) {
      return hopsDetails.map((_, index) => (
        <View key={index} style={{ marginTop: 2 }}>
          <Text style={[styles.fermentableTitle, styles.underlineText]}>
            Hops {index + 1}:
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hops Type:</Text>
            <TextInput
              style={styles.input}
              value={hopsDetails[index].id}
              onChangeText={(text) =>
                handleHopsChange(index, "id", parseInt(text))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount (g):</Text>
            <TextInput
              style={styles.input}
              value={hopsDetails[index].amount_kg}
              onChangeText={(text) =>
                handleHopsChange(index, "amount_kg", parseFloat(text))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time (minutes):</Text>
            <TextInput
              style={styles.input}
              value={hopsDetails[index].time_minutes}
              onChangeText={(text) =>
                handleHopsChange(index, "time_minutes", parseFloat(text))
              }
            />
          </View>
        </View>
      ));
    } else {
      return null;
    }
  };

  const yeastPicker = () => {
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsYeastPickerVisible(true)}
        >
          <Text style={styles.label}>Yeast:</Text>
          <TextInput
            style={styles.input}
            value={String(yeast)}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const modalForYeastPicker = () => {
    return (
      <Modal
        visible={isYeastPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={yeast}
              onValueChange={(itemValue) => handleYeastPickerSelect(itemValue)}
              style={styles.picker}
            >
              {[...Array(11).keys()].map((item) => (
                <Picker.Item key={item} label={String(item)} value={item} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setIsYeastPickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const getYeastDetails = () => {
    if (yeast > 0) {
      return yeastDetails.map((_, index) => (
        <View key={index} style={{ marginTop: 2 }}>
          <Text style={[styles.fermentableTitle, styles.underlineText]}>
            Yeast {index + 1}:
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Yeast Type:</Text>
            <TextInput
              style={styles.input}
              value={yeastDetails[index].id}
              onChangeText={(text) =>
                handleYeastChange(index, "id", parseInt(text))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Temperature (°C):</Text>
            <TextInput
              style={styles.input}
              value={yeastDetails[index].temperature_celsius}
              onChangeText={(text) =>
                handleYeastChange(
                  index,
                  "temperature_celsius",
                  parseFloat(text)
                )
              }
            />
          </View>
        </View>
      ));
    } else {
      return null;
    }
  };

  const renderSteps = () => {
    return step.map((step) => (
      <View key={step.step_id} style={styles.stepContainer}>
        <Text style={styles.ingredients}>Step {step.step_id}:</Text>
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

  const handleAddNotification = () => {
    setNotifications([...notifications, { message: "", send_after_days: 0 }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index][field] = value;
    setNotifications(updatedNotifications);
  };

  const renderNotifications = () => {
    return notifications.map((notification, index) => (
      <View key={index} style={styles.stepContainer}>
        <Text style={[styles.ingredients, { marginBottom: 10 }]}>
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

  const handleSubmit = async () => {
    const recipe = {
      user_id: userId,
      recipe_name: recipeName,
      method: method,
      style: style,
      abv: parseFloat(abv),
      ibu: parseFloat(ibu),
      original_gravity: parseFloat(originalGravity),
      final_gravity: parseFloat(finalGravity),
      color: parseFloat(color),
      batch_size_liter: parseFloat(batchSizeLiter),
      recipe: step,
      notifications: notifications,
      fermentables: fermentableDetails,
      hops: hopsDetails,
      yeast: yeastDetails,
    };

    const url = "https://brewtothefuture.azurewebsites.net/api/brew/recipe";

    (async () => {
      try {
        const response = await axios.post(url, recipe, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log("Recipe created successfully!");
          console.log(response.data); // Assuming the response contains data
        } else {
          console.error(`Error: ${response.status}`);
          console.error(response.data); // Might contain error details
        }
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.container, { backgroundColor: "#F1F1F1" }]}>
          <Text style={styles.welcomeMessage}>
            Let's craft your perfect brew!
          </Text>
          <Text style={styles.ingredients}>Edit your recipe below:</Text>
          {/* Recipe Name Input */}
          {getRecipeName()}
          {/* Method Input */}
          {getMethod()}
          {/* Style Input */}
          {getStyle()}
          {/* ABV Input */}
          {getABV()}
          {/* IBU Input */}
          {getIBU()}
          {/* Original Gravity Input */}
          {getOriginalGravity()}
          {/* Final Gravity Input */}
          {getFinalGravity()}
          {/* Color Input */}
          {getColor()}
          {/* Batch Size Liter Input */}
          {getBatchSize()}
          {/* Fermentables Picker */}
          {fermentablesPicker()}
          {/* Modal for Fermentables Picker */}
          {modalForFermentablesPicker()}
          {/* Fermentable Details */}
          {getFermentableDetails()}
          {/* Hops Picker */}
          {hopsPicker()}
          {/* Modal for Hops Picker */}
          {modalForHopsPicker()}
          {/* Hops Details */}
          {getHopsDetails()}
          {/* Yeast Picker */}
          {yeastPicker()}
          {/* Modal for Yeast Picker */}
          {modalForYeastPicker()}

          {/* Yeast Details */}
          {getYeastDetails()}
          <Text style={styles.ingredients}>
            Add step for the brewing process:
          </Text>

          {/* Display steps */}
          {renderSteps()}
          <TouchableOpacity onPress={addStep} style={styles.addStepButton}>
            <Text style={styles.addStepButtonText}>Add Step</Text>
          </TouchableOpacity>

          {/* Add Fermentation Button */}
          <Text style={styles.ingredients}>
            Add message for the fermentation process:
          </Text>

          {renderNotifications()}
          <TouchableOpacity
            onPress={handleAddNotification}
            style={styles.addStepButton}
          >
            <Text style={styles.addStepButtonText}>
              Add fermentation message
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateRecipe;
