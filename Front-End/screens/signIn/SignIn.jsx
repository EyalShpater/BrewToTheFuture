import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import styles from "./SignIn.style";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "759128137345-56d2isb7q3e4r3l1mdnjv0mju4sj8rrr.apps.googleusercontent.com", // Replace with your web client ID
  //     offlineAccess: true, // For server-side access
  //   });

  //   checkIfSignedIn();
  // }, []);

  // const checkIfSignedIn = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   setIsSignedIn(isSignedIn);
  //   if (isSignedIn) {
  //     getCurrentUserInfo();
  //   }
  // };

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available
  //     const userInfo = await GoogleSignin.signIn();
  //     setUserInfo(userInfo);
  //     setIsSignedIn(true);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("User cancelled the sign-in process");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log("Sign-in in progress");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("Google Play Services not available");
  //     } else {
  //       console.error("Error signing in", error);
  //     }
  //   }
  // };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.signOut();
  //     setUserInfo(null);
  //     setIsSignedIn(false);
  //   } catch (error) {
  //     console.error("Error signing out", error);
  //   }
  // };

  // const getCurrentUserInfo = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently();
  //     setUserInfo(userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //       console.log("User has not signed in yet");
  //     } else {
  //       console.error("Error getting current user info", error);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Sign-In</Text>
      {/* {isSignedIn ? (
        <View>
          <Text>Welcome {userInfo?.user?.name}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </View>
      ) : (
        <Button title="Sign In with Google" onPress={signIn} />
      )} */}
    </View>
  );
};

export default SignIn;
