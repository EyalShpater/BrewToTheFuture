import React, { useState, useEffect } from "react";
import styles from "./AIRecipe.style";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const AIRecipe = () => {
  const navigation = useNavigation();

  return (
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
          Let's Generate Your Perfect AI-Crafted Beer Recipe!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AIRecipe;
