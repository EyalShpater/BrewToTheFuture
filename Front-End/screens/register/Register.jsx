import styles from "./Register.style";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    // Implement registration logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleNavigateToSignIn = () => {
    navigation.navigate("SignIn"); // Navigate to Sign In screen
  };

  return (
    <ImageBackground
      source={images.logIn}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.welcomeMessage}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNavigateToSignIn}>
            <Text style={styles.signInLink}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;
