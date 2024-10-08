import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Button,
} from "react-native";
import styles from "./CreateRecipe.style";
import { images } from "../../constants";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { ID_TOKEN } from "../../utils/idToken.js";

const CreateRecipeOne = () => {
  const [userId, setUserId] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [method, setMethod] = useState("");
  const [methodsData, setMethodsData] = useState([]);
  const [isMethodsPickerVisible, setMethodsPickerVisible] = useState(false);
  const [style, setStyle] = useState("");
  const [stylesData, setStylesData] = useState([]);
  const [isStylesPickerVisible, setStylesPickerVisible] = useState(false);
  const [abv, setAbv] = useState("");
  const [ibu, setIbu] = useState("");
  const [originalGravity, setOriginalGravity] = useState("");
  const [finalGravity, setFinalGravity] = useState("");
  const [color, setColor] = useState("");
  const [batchSizeLiter, setBatchSizeLiter] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          "http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/user/details",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );
        if (response.status == 200) {
          setUserId(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, []);

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
    useEffect(() => {
      const fetchMethods = async () => {
        try {
          const response = await axios.get(
            "http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/methods",
            {
              headers: {
                Authorization: `Bearer ${ID_TOKEN}`,
              },
            }
          );
          setMethodsData(response.data);
        } catch (error) {
          console.error("Error fetching methods:", error);
        }
      };

      fetchMethods();
    }, []);

    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setMethodsPickerVisible(true)}
        >
          <Text style={styles.label}>Method:</Text>
          <TextInput
            style={styles.input}
            value={String(method)}
            placeholder="Choose option"
            placeholderTextColor="#999"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const modalForMethodPicker = () => {
    return (
      <Modal
        visible={isMethodsPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={method}
              onValueChange={(itemValue) =>
                handleMethodsPickerSelect(itemValue)
              }
              style={styles.picker}
            >
              {methodsData.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setMethodsPickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const handleMethodsPickerSelect = (value) => {
    setMethod(value);
    setMethodsPickerVisible(false);
  };

  const getStyle = () => {
    useEffect(() => {
      const fetchStyles = async () => {
        try {
          const response = await axios.get(
            "http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/styles",
            {
              headers: {
                Authorization: `Bearer ${ID_TOKEN}`,
              },
            }
          );
          setStylesData(response.data);
        } catch (error) {
          console.error("Error fetching styles:", error);
        }
      };

      fetchStyles();
    }, []);

    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setStylesPickerVisible(true)}
        >
          <Text style={styles.label}>Style:</Text>
          <TextInput
            style={[styles.input, { textAlign: "center" }]}
            value={String(style)}
            placeholder="Choose option"
            placeholderTextColor="#999"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const modalForStylePicker = () => {
    return (
      <Modal
        visible={isStylesPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={style}
              onValueChange={(itemValue) => handleStylesPickerSelect(itemValue)}
              style={styles.picker}
            >
              {stylesData.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
            <Button
              title="Done"
              onPress={() => setStylesPickerVisible(false)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const handleStylesPickerSelect = (value) => {
    setStyle(value);
    setStylesPickerVisible(false);
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
          <Text style={[styles.welcomeMessage, { marginTop: 20 }]}>
            Let's Craft Your Perfect Brew!
          </Text>
          <Text style={styles.instructions}>Edit your recipe below:</Text>
          {getRecipeName()}
          {getMethod()}
          {modalForMethodPicker()}
          {getStyle()}
          {modalForStylePicker()}
          {getABV()}
          {getIBU()}
          {getOriginalGravity()}
          {getFinalGravity()}
          {getColor()}
          {getBatchSize()}

          <TouchableOpacity
            onPress={() => handleNavigation("CreateRecipeTwo")}
            style={styles.nextPageButton}
          >
            <Text style={styles.nextPageButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CreateRecipeOne;
