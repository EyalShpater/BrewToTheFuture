import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import styles from "./SignIn.style";
import { auth } from "../../firebaseConfig"; // Import the Firebase JS auth instance
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

// import InAppBrowser from "react-native-inappbrowser-reborn";

// const GoogleLogin = () => {
//   const openGoogleLogin = async () => {
//     const url = "https://your-server.com/auth/google";
//     try {
//       if (await InAppBrowser.isAvailable()) {
//         const result = await InAppBrowser.open(url, {
//           // Customize the browser if needed
//         });
//         console.log(result);
//       } else {
//         // Fallback to opening the URL in the default browser
//         Linking.openURL(url);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return <Button title="Login with Google" onPress={openGoogleLogin} />;
// };

// export default GoogleLogin;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      // Firebase sign-in method
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // If sign-in is successful, navigate to the "Welcome" screen
      navigation.navigate("Welcome", {
        userUid: userCredential.user.uid,
      });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // If the user does not exist, show an alert
        Alert.alert("User Not Found", "The username or password is incorrect.");
      } else if (error.code === "auth/wrong-password") {
        // If the password is incorrect, show an alert
        Alert.alert(
          "Incorrect Password",
          "The username or password is incorrect."
        );
      } else {
        // Handle other errors
        Alert.alert("Error", error.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert(
        "Enter Email",
        "Please enter your email to reset your password."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Password Reset",
        "If an account with that email exists, a password reset email has been sent."
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
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
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.registerLink}>Forgot your password?</Text>
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
