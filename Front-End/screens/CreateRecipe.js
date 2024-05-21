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

const CreateRecipe = () => {
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
  const [fermentableDetails, setFermentableDetails] = useState([]);
  const [hops, setHops] = useState(0);
  const [isHopsPickerVisible, setIsHopsPickerVisible] = useState(false);
  const [hopsDetails, setHopsDetails] = useState([]);
  const [yeast, setYeast] = useState(0);
  const [isYeastPickerVisible, setIsYeastPickerVisible] = useState(false);
  const [yeastDetails, setYeastDetails] = useState([]);
  const [steps, setSteps] = useState([
    {
      id: 1,
      temperature: "",
      duration: "",
      notify: "",
    },
  ]);
  const [notifySwitches, setNotifySwitches] = useState(steps.map(() => false));

  const handleFermentablesPickerSelect = (value) => {
    setFermentables(value);
    setIsFermentablesPickerVisible(false);
    setFermentableDetails(
      Array.from({ length: value }, () => ({ grainType: "", amountKg: "" }))
    );
  };

  const handleHopsPickerSelect = (value) => {
    setHops(value);
    setIsHopsPickerVisible(false);
    setHopsDetails(
      Array.from({ length: value }, () => ({
        hopsType: "",
        amount: "",
        time: "",
      }))
    );
  };

  const handleYeastPickerSelect = (value) => {
    setYeast(value);
    setIsYeastPickerVisible(false);
    setYeastDetails(
      Array.from({ length: value }, () => ({
        yeastType: "",
        temperature: "",
      }))
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
    const newStepId = steps.length + 1;
    setSteps([
      ...steps,
      {
        id: newStepId,
        temperature: "",
        duration: "",
        notify: "",
      },
    ]);
  };

  const handleStepChange = (id, field, value) => {
    const updatedSteps = steps.map((step) =>
      step.id === id ? { ...step, [field]: value } : step
    );
    setSteps(updatedSteps);
  };

  const toggleNotifySwitch = (stepId, value) => {
    const updatedNotifySwitches = [...notifySwitches];
    updatedNotifySwitches[stepId - 1] = value;
    setNotifySwitches(updatedNotifySwitches);
  };

  const handleNotifySwitchChange = (stepId, value) => {
    toggleNotifySwitch(stepId, value);
  };

  const renderNotifyField = (stepId) => {
    return notifySwitches[stepId - 1] ? (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Notify when step ends:</Text>
        <TextInput
          style={styles.input}
          value={steps[stepId - 1].notify}
          onChangeText={(text) => handleStepChange(stepId, "notify", text)}
        />
      </View>
    ) : null;
  };

  const handleSubmit = async () => {
    const recipeData = {
      recipeName,
      method,
      style,
      abv,
      ibu,
      originalGravity,
      finalGravity,
      color,
      batchSizeLiter,
      fermentableDetails,
      hopsDetails,
      yeastDetails,
      steps,
    };

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Recipe submitted successfully");
      } else {
        // Handle errors
        console.error("Error submitting recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          {/* Method Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Method:</Text>
            <TextInput
              style={styles.input}
              value={method}
              onChangeText={(text) => setMethod(text)}
            />
          </View>
          {/* Style Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Style:</Text>
            <TextInput
              style={styles.input}
              value={style}
              onChangeText={(text) => setStyle(text)}
            />
          </View>
          {/* ABV Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ABV:</Text>
            <TextInput
              style={styles.input}
              value={abv}
              onChangeText={(text) => setAbv(text)}
            />
          </View>
          {/* IBU Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>IBU:</Text>
            <TextInput
              style={styles.input}
              value={ibu}
              onChangeText={(text) => setIbu(text)}
            />
          </View>
          {/* Original Gravity Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Original Gravity:</Text>
            <TextInput
              style={styles.input}
              value={originalGravity}
              onChangeText={(text) => setOriginalGravity(text)}
            />
          </View>
          {/* Final Gravity Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Final Gravity:</Text>
            <TextInput
              style={styles.input}
              value={finalGravity}
              onChangeText={(text) => setFinalGravity(text)}
            />
          </View>
          {/* Color Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Color:</Text>
            <TextInput
              style={styles.input}
              value={color}
              onChangeText={(text) => setColor(text)}
            />
          </View>
          {/* Batch Size Liter Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Batch Size (L):</Text>
            <TextInput
              style={styles.input}
              value={batchSizeLiter}
              onChangeText={(text) => setBatchSizeLiter(text)}
            />
          </View>
          {/* Fermentables Picker */}
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
          {/* Modal for Fermentables Picker */}
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
          {/* Fermentable Details */}
          {fermentableDetails.map((_, index) => (
            <View key={index} style={{ marginTop: 2 }}>
              <Text style={[styles.fermentableTitle, styles.underlineText]}>
                Fermentable {index + 1}:
              </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Grain Type:</Text>
                <TextInput
                  style={styles.input}
                  value={fermentableDetails[index].grainType}
                  onChangeText={(text) =>
                    handleFermentableChange(index, "grainType", text)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount (kg):</Text>
                <TextInput
                  style={styles.input}
                  value={fermentableDetails[index].amountKg}
                  onChangeText={(text) =>
                    handleFermentableChange(index, "amountKg", text)
                  }
                />
              </View>
            </View>
          ))}
          {/* Hops Picker */}
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
          {/* Modal for Hops Picker */}
          <Modal
            visible={isHopsPickerVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.pickerModal}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={hops}
                  onValueChange={(itemValue) =>
                    handleHopsPickerSelect(itemValue)
                  }
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
          {/* Hops Details */}
          {hopsDetails.map((_, index) => (
            <View key={index} style={{ marginTop: 2 }}>
              <Text style={[styles.fermentableTitle, styles.underlineText]}>
                Hops {index + 1}:
              </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Hops Type:</Text>
                <TextInput
                  style={styles.input}
                  value={hopsDetails[index].hopsType}
                  onChangeText={(text) =>
                    handleHopsChange(index, "hopsType", text)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount (g):</Text>
                <TextInput
                  style={styles.input}
                  value={hopsDetails[index].amount}
                  onChangeText={(text) =>
                    handleHopsChange(index, "amount", text)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Time (minutes):</Text>
                <TextInput
                  style={styles.input}
                  value={hopsDetails[index].time}
                  onChangeText={(text) => handleHopsChange(index, "time", text)}
                />
              </View>
            </View>
          ))}
          {/* Yeast Picker */}
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
          {/* Modal for Yeast Picker */}
          <Modal
            visible={isYeastPickerVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.pickerModal}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={yeast}
                  onValueChange={(itemValue) =>
                    handleYeastPickerSelect(itemValue)
                  }
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

          {/* Yeast Details */}
          {yeastDetails.map((_, index) => (
            <View key={index} style={{ marginTop: 2 }}>
              <Text style={[styles.fermentableTitle, styles.underlineText]}>
                Yeast {index + 1}:
              </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Yeast Type:</Text>
                <TextInput
                  style={styles.input}
                  value={yeastDetails[index].yeastType}
                  onChangeText={(text) =>
                    handleYeastChange(index, "yeastType", text)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Temperature (°C):</Text>
                <TextInput
                  style={styles.input}
                  value={yeastDetails[index].temperature}
                  onChangeText={(text) =>
                    handleYeastChange(index, "temperature", text)
                  }
                />
              </View>
            </View>
          ))}
          <Text style={styles.ingredients}>
            Add steps for the brewing process:
          </Text>
          {/* Display steps */}
          {steps.map((step) => (
            <View key={step.id} style={styles.stepContainer}>
              <Text style={styles.ingredients}>Step {step.id}:</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Temperature (°C):</Text>
                <TextInput
                  style={styles.input}
                  value={step.temperature}
                  onChangeText={(text) =>
                    handleStepChange(step.id, "temperature", text)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Duration (minutes):</Text>
                <TextInput
                  style={styles.input}
                  value={step.duration}
                  onChangeText={(text) =>
                    handleStepChange(step.id, "duration", text)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Enable Notification:</Text>
                <Switch
                  value={notifySwitches[step.id - 1]}
                  onValueChange={(value) =>
                    handleNotifySwitchChange(step.id, value)
                  }
                />
              </View>
              {renderNotifyField(step.id)}
            </View>
          ))}
          {/* Add Step Button */}
          <TouchableOpacity onPress={addStep} style={styles.addStepButton}>
            <Text style={styles.addStepButtonText}>Add Step</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateRecipe;

// const CreateRecipe = () => {
//   const [recipeName, setRecipeName] = useState("");
//   const [stepsAmount, setStepsAmount] = useState(1);
//   const [steps, setSteps] = useState([]);

//   const handleStepsAmountChange = (value) => {
//     const numSteps = parseInt(value);
//     setStepsAmount(numSteps);
//     setSteps(new Array(numSteps).fill({}));
//   };

//   const handleStepFieldChange = (index, fieldName, value) => {
//     const updatedSteps = [...steps];
//     updatedSteps[index] = {
//       ...updatedSteps[index],
//       [fieldName]: value,
//     };
//     setSteps(updatedSteps);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
//       <View style={[styles.container, { backgroundColor: "#F1F1F1" }]}>
//         <Text style={styles.welcomeMessage}>
//           Let's craft your perfect brew!
//         </Text>
//         <Text style={styles.ingredients}>Edit your recipe below:</Text>

//         {/* recipe name */}
//         <View style={{ marginTop: 20 }}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Recipe name:</Text>
//             <TextInput
//               style={styles.input}
//               value={recipeName}
//               onChangeText={(text) => setRecipeName(text)}
//             />
//           </View>
//         </View>

//         {/* Steps Amount Picker */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Select steps amount (1-5):</Text>
//           <Picker
//             selectedValue={stepsAmount}
//             style={styles.picker}
//             onValueChange={(itemValue) => handleStepsAmountChange(itemValue)}
//           >
//             {[1, 2, 3, 4, 5].map((number) => (
//               <Picker.Item key={number} label={String(number)} value={number} />
//             ))}
//           </Picker>
//         </View>

//         {/* Dynamic Step Fields */}
//         {steps.map((_, index) => (
//           <View key={index} style={styles.stepContainer}>
//             <Text style={styles.stepTitle}>Step {index + 1}</Text>
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Temperature (°C):</Text>
//               <TextInput
//                 style={styles.stepInput}
//                 value={steps[index]?.temperature_celsius}
//                 onChangeText={(text) =>
//                   handleStepFieldChange(index, "temperature_celsius", text)
//                 }
//               />
//             </View>
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Duration (minutes):</Text>
//               <TextInput
//                 style={styles.stepInput}
//                 value={steps[index]?.duration_minutes}
//                 onChangeText={(text) =>
//                   handleStepFieldChange(index, "duration_minutes", text)
//                 }
//               />
//             </View>
//             <View style={styles.fieldContainer}>
//               <Text style={styles.fieldLabel}>Message:</Text>
//               <TextInput
//                 style={styles.stepInput}
//                 value={steps[index]?.message}
//                 onChangeText={(text) =>
//                   handleStepFieldChange(index, "message", text)
//                 }
//               />
//             </View>
//           </View>
//         ))}

//         {/* Submit Button */}
//         <Button
//           title="Submit"
//           onPress={() => console.log({ recipeName, steps })}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CreateRecipe;
