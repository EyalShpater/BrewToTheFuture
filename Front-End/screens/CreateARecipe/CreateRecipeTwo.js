import React, { useState, useEffect } from "react";
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
  ImageBackground,
} from "react-native";
import styles from "./CreateRecipe.style";
import { Picker } from "@react-native-picker/picker";
import { images } from "../../constants";
import axios from "axios";
import { ID_TOKEN } from "../../utils/idToken.js";

const CreateRecipeTwo = () => {
  const [fermentablesAmount, setFermentablesAmount] = useState(0);
  const [
    isFermentablesAmountPickerVisible,
    setIsFermentablesAmountPickerVisible,
  ] = useState(false);
  const [fermentableDetails, setFermentableDetails] = useState([
    {
      id: 0,
      amount_kg: 0,
      type: null, // Added type property
    },
  ]);
  const [fermentablesOptions, setFermentablesOptions] = useState(null);
  const [fermentableTypePickerIndex, setFermentableTypePickerIndex] =
    useState(null); // Added to keep track of which index to update

  const [isFermentablesTypePickerVisible, setIsFermentablesTypePickerVisible] =
    useState(false);

  const [hopsAmount, setHopsAmount] = useState(0);
  const [isHopsAmountPickerVisible, setIsHopsAmountPickerVisible] =
    useState(false);
  const [hopsDetails, setHopsDetails] = useState([
    {
      id: 0,
      amount_g: 0,
      time_minutes: 0,
      type: null, // Added type property
    },
  ]);
  const [hopsOptions, setHopsOptions] = useState(null);
  const [hopsTypePickerIndex, setHopsTypePickerIndex] = useState(null); // Added to keep track of which index to update
  const [isHopsTypePickerVisible, setIsHopsTypePickerVisible] = useState(false);

  const [yeastAmount, setYeastAmount] = useState(0);
  const [isYeastAmountPickerVisible, setIsYeastAmountPickerVisible] =
    useState(false);
  const [yeastDetails, setYeastDetails] = useState([
    {
      id: 0,
      temperature_celsius: 0,
      type: null, // Added type property
    },
  ]);
  const [yeastOptions, setYeastOptions] = useState(null);
  const [yeastTypePickerIndex, setYeastTypePickerIndex] = useState(null); // Added to keep track of which index to update
  const [isYeastTypePickerVisible, setIsYeastTypePickerVisible] =
    useState(false);

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
    setFermentablesAmount(value);
    setIsFermentablesAmountPickerVisible(false);
    setFermentableDetails(
      Array.from({ length: value }, () => ({
        id: 0,
        amount_kg: 0,
        type: null, // Added type property
      }))
    );
  };

  const handleHopsPickerSelect = (value) => {
    setHopsAmount(value);
    setIsHopsAmountPickerVisible(false);
    setHopsDetails(
      Array.from({ length: value }, () => ({
        id: 0,
        amount_g: 0,
        time_minutes: 0,
        type: null, // Added type property
      }))
    );
  };

  const handleYeastPickerSelect = (value) => {
    setYeastAmount(value);
    setIsYeastAmountPickerVisible(false);
    setYeastDetails(
      Array.from({ length: value }, () => ({
        id: 0,
        temperature_celsius: 0,
        type: null, // Added type property
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

  const fermentablesPicker = () => {
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsFermentablesAmountPickerVisible(true)}
        >
          <Text style={styles.label}>Choose amount:</Text>
          <TextInput
            style={styles.input}
            value={String(fermentablesAmount)}
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
        visible={isFermentablesAmountPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fermentablesAmount}
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
              onPress={() => setIsFermentablesAmountPickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const getFermentableDetails = () => {
    useEffect(() => {
      const fetchFermentables = async () => {
        try {
          const response = await axios.get(
            "https://brewtothefuture.azurewebsites.net/api/brew/ingredients/fermentables",
            {
              headers: {
                Authorization: `Bearer ${ID_TOKEN}`,
              },
            }
          );
          setFermentablesOptions(response.data);
        } catch (error) {
          console.error("Error fetching Fermentables data:", error);
        }
      };

      fetchFermentables();
    }, []);

    if (fermentablesAmount > 0) {
      return fermentableDetails.map((_, index) => (
        <View key={index} style={{ marginTop: 2 }}>
          <Text style={[styles.ingredientTitle, styles.underlineText]}>
            Fermentable {index + 1}:
          </Text>

          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              setFermentableTypePickerIndex(index);
              setIsFermentablesTypePickerVisible(true);
            }}
          >
            <Text style={styles.label}>Grain Type:</Text>
            <TextInput
              style={[styles.pickerInput, { textAlign: "center" }]}
              value={fermentableDetails[index].type}
              placeholder="Choose option"
              placeholderTextColor="#999"
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          {modalForFermentablesTypesPicker(index)}
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

  const modalForFermentablesTypesPicker = (index) => {
    return (
      <Modal
        visible={
          isFermentablesTypePickerVisible &&
          fermentableTypePickerIndex === index
        }
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fermentableDetails[index]?.type}
              onValueChange={(itemValue) =>
                handleFermentablesTypesPickerSelect(index, itemValue)
              }
              style={styles.picker}
            >
              {fermentablesOptions.map((item, idx) => (
                <Picker.Item key={idx} label={item.name} value={item.name} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setIsFermentablesTypePickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const handleFermentablesTypesPickerSelect = (index, name) => {
    const selectedOption = fermentablesOptions.find(
      (option) => option.name === name
    );
    if (selectedOption) {
      const updatedFermentableDetails = fermentableDetails.map((detail, i) =>
        i === index ? { ...detail, id: selectedOption.id, type: name } : detail
      );
      setFermentableDetails(updatedFermentableDetails);
    }
    setIsFermentablesTypePickerVisible(false);
  };

  const hopsPicker = () => {
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsHopsAmountPickerVisible(true)}
        >
          <Text style={styles.label}>Choose amount:</Text>
          <TextInput
            style={styles.input}
            value={String(hopsAmount)}
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
        visible={isHopsAmountPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={hopsAmount}
              onValueChange={(itemValue) => handleHopsPickerSelect(itemValue)}
              style={styles.picker}
            >
              {[...Array(11).keys()].map((item) => (
                <Picker.Item key={item} label={String(item)} value={item} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setIsHopsAmountPickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const getHopsDetails = () => {
    useEffect(() => {
      const fetchHops = async () => {
        try {
          const response = await axios.get(
            "https://brewtothefuture.azurewebsites.net/api/brew/ingredients/hops",
            {
              headers: {
                Authorization: `Bearer ${ID_TOKEN}`,
              },
            }
          );
          setHopsOptions(response.data);
        } catch (error) {
          console.error("Error fetching hops data:", error);
        }
      };

      fetchHops();
    }, []);

    if (hopsAmount > 0) {
      return hopsDetails.map((_, index) => (
        <View key={index} style={{ marginTop: 2 }}>
          <Text style={[styles.ingredientTitle, styles.underlineText]}>
            Hops {index + 1}:
          </Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              setHopsTypePickerIndex(index);
              setIsHopsTypePickerVisible(true);
            }}
          >
            <Text style={styles.label}>Hops Type:</Text>
            <TextInput
              style={[styles.pickerInput, { textAlign: "center" }]}
              value={hopsDetails[index].type}
              placeholder="Choose option"
              placeholderTextColor="#999"
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          {modalForHopsTypesPicker(index)}
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

  const modalForHopsTypesPicker = (index) => {
    return (
      <Modal
        visible={isHopsTypePickerVisible && hopsTypePickerIndex === index}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={hopsDetails[index]?.type}
              onValueChange={(itemValue) =>
                handleHopsTypesPickerSelect(index, itemValue)
              }
              style={styles.picker}
            >
              {hopsOptions.map((item, idx) => (
                <Picker.Item key={idx} label={item.name} value={item.name} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setIsHopsTypePickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const handleHopsTypesPickerSelect = (index, name) => {
    const selectedOption = hopsOptions.find((option) => option.name === name);

    if (selectedOption) {
      const updatedHopsDetails = hopsDetails.map((detail, i) =>
        i === index ? { ...detail, id: selectedOption.id, type: name } : detail
      );
      setHopsDetails(updatedHopsDetails);
    }
    setIsHopsTypePickerVisible(false);
  };

  const yeastPicker = () => {
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsYeastAmountPickerVisible(true)}
        >
          <Text style={styles.label}>Choose amount:</Text>
          <TextInput
            style={styles.input}
            value={String(yeastAmount)}
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
        visible={isYeastAmountPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={yeastAmount}
              onValueChange={(itemValue) => handleYeastPickerSelect(itemValue)}
              style={styles.picker}
            >
              {[...Array(11).keys()].map((item) => (
                <Picker.Item key={item} label={String(item)} value={item} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setIsYeastAmountPickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const getYeastDetails = () => {
    useEffect(() => {
      const fetchYeasts = async () => {
        try {
          const response = await axios.get(
            "https://brewtothefuture.azurewebsites.net/api/brew/ingredients/yeasts",
            {
              headers: {
                Authorization: `Bearer ${ID_TOKEN}`,
              },
            }
          );
          setYeastOptions(response.data);
        } catch (error) {
          console.error("Error fetching yeasts data:", error);
        }
      };

      fetchYeasts();
    }, []);

    if (yeastAmount > 0) {
      return yeastDetails.map((_, index) => (
        <View key={index} style={{ marginTop: 2 }}>
          <Text style={[styles.ingredientTitle, styles.underlineText]}>
            Yeast {index + 1}:
          </Text>

          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              setYeastTypePickerIndex(index);
              setIsYeastTypePickerVisible(true);
            }}
          >
            <Text style={styles.label}>Yeast Type:</Text>
            <TextInput
              style={[styles.pickerInput, { textAlign: "center" }]}
              value={yeastDetails[index].type}
              placeholder="Choose option"
              placeholderTextColor="#999"
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          {modalForYeastsTypesPicker(index)}
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

  const modalForYeastsTypesPicker = (index) => {
    return (
      <Modal
        visible={isYeastTypePickerVisible && yeastTypePickerIndex === index}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={yeastDetails[index]?.type}
              onValueChange={(itemValue) =>
                handleYeastsTypesPickerSelect(index, itemValue)
              }
              style={styles.picker}
            >
              {yeastOptions.map((item, idx) => (
                <Picker.Item key={idx} label={item.name} value={item.name} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setIsYeastTypePickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const handleYeastsTypesPickerSelect = (index, name) => {
    const selectedOption = yeastOptions.find((option) => option.name === name);
    if (selectedOption) {
      const updatedYeastDetails = yeastDetails.map((detail, i) =>
        i === index ? { ...detail, id: selectedOption.id, type: name } : detail
      );
      setYeastDetails(updatedYeastDetails);
    }
    setIsYeastTypePickerVisible(false);
  };

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName, {
      //userId: route.params.userId,
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
              { marginBottom: 20 },
              { marginTop: 30 },
            ]}
          >
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
    </ImageBackground>
  );
};

export default CreateRecipeTwo;
