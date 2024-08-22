import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { images } from "../../constants";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import styles from "./SignIn.style";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignIn = () => {
    // Implement sign-in logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("Register"); // Navigate to Register screen
  };

  return (
    <ImageBackground
      source={images.logIn}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.welcomeMessage}>Sign In</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
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

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNavigateToRegister}>
            <Text style={styles.registerLink}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
