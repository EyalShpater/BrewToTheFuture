import React, { useState } from "react";
import styles from "./brew.style";
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Button,
  FlatList,
} from "react-native";

const Brew = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            styles.welcomeMessage,
            { marginTop: 30 },
            { marginBottom: 30 },
          ]}
        >
          Currently brewing:
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Brew;
