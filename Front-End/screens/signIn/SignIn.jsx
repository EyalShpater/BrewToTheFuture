import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Alert,
  Button,
} from "react-native";
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import styles from "./SignIn.style";
import { auth } from "../../firebaseConfig"; // Import the Firebase JS auth instance
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import InAppBrowser from "react-native-inappbrowser-reborn";
// import { storeToken } from "../../utils/auth";
// import * as AuthSession from "expo-auth-session";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

// // Set the redirect URL for the Expo app
// WebBrowser.maybeCompleteAuthSession();

// // Google OAuth credentials (use your own)
// const CLIENT_ID =
//   "849504804240-4hav6ge0onf789q7v7spf1m455guet8r.apps.googleusercontent.com";
// const REDIRECT_URI = AuthSession.makeRedirectUri({
//   useProxy: true,
// });

// export default function App() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: CLIENT_ID,
//       scopes: ["profile", "email"],
//       redirectUri: REDIRECT_URI,
//       responseType: "code",
//     },
//     { authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth" }
//   );

//   useEffect(() => {
//     if (response?.type === "success") {
//       const { access_token } = response.params;

//       // Fetch user data using the access token
//       fetch("https://www.googleapis.com/userinfo/v2/me", {
//         headers: { Authorization: `Bearer ${access_token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => setUserInfo(data));
//     }
//   }, [response]);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       {userInfo ? (
//         <View>
//           <Text>Welcome, {userInfo.name}</Text>
//           <Text>Email: {userInfo.email}</Text>
//         </View>
//       ) : (
//         <Button
//           disabled={!request}
//           title="Login with Google"
//           onPress={() => promptAsync()}
//         />
//       )}
//     </View>
//   );
// }
/********************************** */
// const GoogleLogin = () => {
//   //console.log(InAppBrowser);
//   const openGoogleLogin = async () => {
//     const url = "https://brewtothefuture.azurewebsites.net/login";

//     try {
//       if (await InAppBrowser.isAvailable()) {
//         const result = await InAppBrowser.open(url, {
//           dismissButtonStyle: "close",
//           preferredBarTintColor: "#000000",
//           preferredControlTintColor: "#ffffff",
//           readerMode: false,
//           animated: true,
//           modalPresentationStyle: "fullScreen",
//         });
//         // Assuming you receive the token from the URL after successful login
//         const token = result.url.split("token=")[1]; // Example extraction
//         if (token) {
//           await storeToken(token); // Store the token in AsyncStorage
//         }
//       } else {
//         console.warn("InAppBrowser is not available");
//       }
//     } catch (error) {
//       console.error("Error opening InAppBrowser: ", error);
//     }
//   };

//   return (
//     <SafeAreaView>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.welcomeMessage}>Sign In</Text>
//         <Button title="Login with Google" onPress={openGoogleLogin} />
//       </ScrollView>
//     </SafeAreaView>
//   );
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

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Button } from "react-native";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// import { useEffect, useState } from "react";

// // npx expo install @react-native-google-signin/google-signin
// // npx expo install expo-dev-client

// export default function App() {
//   const [error, setError] = useState();
//   const [userInfo, setUserInfo] = useState();

//   const configureGoogleSignIn = () => {
//     GoogleSignin.configure({
//       webClientId:
//         "849504804240-jpn7ht6761dhf279buu8fgqgof90cje3.apps.googleusercontent.com",
//       iosClientId:
//         "849504804240-b0jad2ck09pbfegia5sdqpac100hacuj.apps.googleusercontent.com",
//     });
//   };

//   useEffect(() => {
//     configureGoogleSignIn();
//   });

//   const signIn = async () => {
//     console.log("Pressed sign in");

//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       setUserInfo(userInfo);
//       setError();
//     } catch (e) {
//       setError(e);
//     }
//   };

//   const logout = () => {
//     setUserInfo(undefined);
//     GoogleSignin.revokeAccess();
//     GoogleSignin.signOut();
//   };

//   return (
//     <View style={styles.container}>
//       <Text>{JSON.stringify(error)}</Text>
//       {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
//       {userInfo ? (
//         <Button title="Logout" onPress={logout} />
//       ) : (
//         <GoogleSigninButton
//           size={GoogleSigninButton.Size.Standard}
//           color={GoogleSigninButton.Color.Dark}
//           onPress={signIn}
//         />
//       )}
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// import React, { useState, useEffect } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { useAuthRequest } from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [error, setError] = useState(null);

//   const [request, response, promptAsync] = useAuthRequest({
//     clientId:
//       "849504804240-jpn7ht6761dhf279buu8fgqgof90cje3.apps.googleusercontent.com",
//     redirectUri: "https://auth.expo.io/@adi19/breww",
//     scopes: ["profile", "email"],
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       console.log("Response:", response);
//       const { authentication } = response;
//       fetchUserInfo(authentication.accessToken);
//     } else if (response?.type === "error") {
//       console.log("Error:", response.error);
//       setError(response.error);
//     }
//   }, [response]);

//   const fetchUserInfo = async (token) => {
//     try {
//       const userInfoResponse = await fetch(
//         "https://www.googleapis.com/oauth2/v3/userinfo",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const userInfo = await userInfoResponse.json();
//       console.log("User Info:", userInfo);
//       setUserInfo(userInfo);
//     } catch (error) {
//       console.error("Fetch User Info Error:", error);
//       setError("Failed to fetch user info.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {error && <Text style={styles.errorText}>{error.message}</Text>}
//       {userInfo ? (
//         <View>
//           <Text>Welcome, {userInfo.name}</Text>
//           <Text>Email: {userInfo.email}</Text>
//           <Button title="Logout" onPress={() => setUserInfo(null)} />
//         </View>
//       ) : (
//         <Button
//           title="Login with Google"
//           disabled={!request}
//           onPress={() => promptAsync()}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 20,
//   },
// });
