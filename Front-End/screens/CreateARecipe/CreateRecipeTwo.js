import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import styles from "./CreateRecipe.style";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "../../constants";

const CreateRecipeTwo = () => {
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
      amount_g: 0,
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
  const navigation = useNavigation();
  const route = useRoute();

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
  // } = route.params;

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
        amount_g: 0,
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

  const fermentablesPicker = () => {
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsFermentablesPickerVisible(true)}
        >
          <Text style={styles.label}>Choose amount:</Text>
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
          <Text style={styles.label}>Choose amount:</Text>
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
              value={hopsDetails[index].amount_g}
              onChangeText={(text) =>
                handleHopsChange(index, "amount_g", parseFloat(text))
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
          <Text style={styles.label}>Choose amount:</Text>
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

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName, {
      userId: route.params.userId,
      recipeName: route.params.recipeName,
      method: route.params.method,
      style: route.params.style,
      abv: route.params.abv,
      ibu: route.params.ibu,
      originalGravity: route.params.originalGravity,
      finalGravity: route.params.finalGravity,
      color: route.params.color,
      batchSizeLiter: route.params.batchSizeLiter,
      fermentableDetails: fermentableDetails,
      yeastDetails: yeastDetails,
      hopsDetails: hopsDetails,
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.backGround }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.instructions, { marginBottom: 20 }]}>
          Add Fermentables:
        </Text>
        {/* Fermentables Picker */}
        {fermentablesPicker()}
        {/* Modal for Fermentables Picker */}
        {modalForFermentablesPicker()}
        {/* Fermentable Details */}
        {getFermentableDetails()}

        <Text style={[styles.instructions, { marginBottom: 20 }]}>
          Add Hops:
        </Text>
        {/* Hops Picker */}
        {hopsPicker()}
        {/* Modal for Hops Picker */}
        {modalForHopsPicker()}
        {/* Hops Details */}
        {getHopsDetails()}

        <Text style={[styles.instructions, { marginBottom: 20 }]}>
          Add Yeast:
        </Text>
        {/* Yeast Picker */}
        {yeastPicker()}
        {/* Modal for Yeast Picker */}
        {modalForYeastPicker()}
        {/* Yeast Details */}
        {getYeastDetails()}

        {/* Next Page Button */}
        <View style={{ marginVertical: 100 }} />
        <TouchableOpacity
          onPress={() => handleNavigation("CreateRecipeThree")}
          style={styles.nextPageButton}
        >
          <Text style={styles.nextPageButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateRecipeTwo;
