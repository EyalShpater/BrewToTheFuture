import React, { useState, useEffect } from "react";
import styles from "./brew.style";
import { COLORS, images } from "../../constants";
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
  Animated,
} from "react-native";

const data = [
  { key: "1", title: "Step 1", description: "This is the first step." },
  { key: "2", title: "Step 2", description: "This is the second step." },
  { key: "3", title: "Step 3", description: "This is the third step." },
  { key: "4", title: "Step 4", description: "This is the fourth step." },
  { key: "5", title: "Step 5", description: "This is the fifth step." },
];

const TimelineItem = ({ item }) => (
  <View style={styles.itemContainer}>
    {/* <View style={styles.line} />
    <View style={styles.circle} /> */}
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
  </View>
);

const HorizontalTimeline = () => {
  return (
    // <SafeAreaView style={styles.timeLineContainer}>
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <TimelineItem item={item} />}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const Brew = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[styles.container, { flex: 1, backgroundColor: COLORS.beige }]}
    >
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
        <Text style={styles.instructions}> Beer name: </Text>
        <Text style={styles.instructions}> Current step: </Text>
        <Text style={styles.instructions}> Current temperature: </Text>
        <Text style={styles.instructions}> Remaining step time: </Text>

        <HorizontalTimeline />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Brew;
