import React, { useState, useEffect } from "react";
import styles from "./Explore.style";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import { ID_TOKEN } from "../../utils/idToken";
import { COLORS } from "../../constants";

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [fermentablesNames, setFermentablesNames] = useState([]);
  const [hopsNames, setHopsNames] = useState([]);
  const [yeastsNames, setYeastsNames] = useState([]);
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://brewtothefuture.azurewebsites.net/api/brew/recipe/all",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${ID_TOKEN}`,
  //           },
  //         }
  //       );

  //       if (response.data) {
  //         const recipesData = response.data;

  //         // Fetch ratings and reviews for each recipe
  //         const ratingsPromises = recipesData.map(async (recipe) => {
  //           try {
  //             const ratingResponse = await axios.get(
  //               `https://brewtothefuture.azurewebsites.net/api/brew/rate/${recipe.recipe_id}`,
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${ID_TOKEN}`,
  //                 },
  //               }
  //             );

  //             const ratingsArray = ratingResponse.data;

  //             // Calculate average rating
  //             const totalRating = ratingsArray.reduce(
  //               (acc, obj) => acc + obj.rating,
  //               0
  //             );
  //             const averageRating =
  //               ratingsArray.length > 0 ? totalRating / ratingsArray.length : 0;

  //             return { ...recipe, averageRating, reviews: ratingsArray };
  //           } catch (error) {
  //             console.error("Error fetching ratings:", error);
  //             return { ...recipe, averageRating: 0, reviews: [] };
  //           }
  //         });

  //         const recipesWithRatings = await Promise.all(ratingsPromises);
  //         setRecipes(recipesWithRatings);
  //       } else {
  //         console.error("No data available.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/recipe/all",
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        );

        if (response.data) {
          const recipesData = response.data;

          // Fetch ratings and reviews for each recipe
          const fetchRatings = async () => {
            const ratingsPromises = recipesData.map(async (recipe) => {
              try {
                const ratingResponse = await axios.get(
                  `http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/rate/${recipe.recipe_id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${ID_TOKEN}`,
                    },
                  }
                );

                const ratingsArray = ratingResponse.data;

                // Calculate average rating
                const totalRating = ratingsArray.reduce(
                  (acc, obj) => acc + obj.rating,
                  0
                );
                const averageRating =
                  ratingsArray.length > 0
                    ? totalRating / ratingsArray.length
                    : 0;

                return { ...recipe, averageRating, reviews: ratingsArray };
              } catch (error) {
                // console.error("Error fetching ratings:", error);
                return { ...recipe, averageRating: 0, reviews: [] };
              }
            });

            const recipesWithRatings = await Promise.all(ratingsPromises);
            setRecipes(recipesWithRatings);
          };

          // Fetch ratings immediately
          fetchRatings();

          // Set interval to fetch ratings every 4 seconds
          // const intervalId = setInterval(fetchRatings, 15000);

          // Clear interval on component unmount
          // return () => clearInterval(intervalId);
        } else {
          console.error("No data available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchFermentableNames = async (fermentables) => {
    const namesPromises = fermentables.map((fermentable) =>
      axios
        .get(
          `http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/ingredients/fermentables/${fermentable.id}`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises)
      .then((names) => {
        setFermentablesNames(names);
        return names;
      })
      .catch((error) => {
        console.error("Error fetching fermentable names:", error);
      });
  };

  const fetchHopsNames = async (hops) => {
    const namesPromises = hops.map((hop) =>
      axios
        .get(
          `http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/ingredients/hops/${hop.id}`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises)
      .then((names) => {
        setHopsNames(names);
        return names;
      })
      .catch((error) => {
        console.error("Error fetching hops names:", error);
      });
  };

  const fetchYeastNames = async (yeasts) => {
    const namesPromises = yeasts.map((yeast) =>
      axios
        .get(
          `http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/ingredients/yeasts/${yeast.id}`,
          {
            headers: {
              Authorization: `Bearer ${ID_TOKEN}`,
            },
          }
        )
        .then((response) => response.data.name)
    );

    return Promise.all(namesPromises)
      .then((names) => {
        setYeastsNames(names);
        return names;
      })
      .catch((error) => {
        console.error("Error fetching yeast names:", error);
      });
  };

  const openModal = (recipe) => {
    setLoading(true); // Set loading to true while fetching data
    Promise.all([
      fetchFermentableNames(recipe.fermentables),
      fetchHopsNames(recipe.hops),
      fetchYeastNames(recipe.yeast),
    ])
      .then(() => {
        setSelectedRecipe(recipe);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching ingredient names:", error);
        setLoading(false); // Set loading to false in case of error
      });
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const renderRecipeDetail = ({ item }) => (
    <Text style={styles.field}>
      <Text style={styles.fieldLabel}>{item.label}:</Text> {item.value}
    </Text>
  );

  const getRecipeDetails = (recipe) => [
    { label: "Name", value: recipe.recipe_name },
    { label: "Method", value: recipe.method },
    { label: "Style", value: recipe.style },
    { label: "ABV", value: `${recipe.abv}%` },
    { label: "IBU", value: recipe.ibu },
    { label: "Original Gravity", value: recipe.original_gravity },
    { label: "Final Gravity", value: recipe.final_gravity },
    { label: "Color", value: recipe.color },
    {
      label: "Batch Size",
      value: `${recipe.batch_size_liter}L`,
    },
    {
      label: "Fermentables",
      value:
        Array.isArray(recipe.fermentables) && recipe.fermentables.length
          ? recipe.fermentables
              .map(
                (f, index) =>
                  `\n${index + 1}. Name: ${fermentablesNames[index]}, Amount: ${
                    f.amount_kg
                  }kg`
              )
              .join("")
          : "N/A",
    },
    {
      label: "Hops",
      value:
        Array.isArray(recipe.hops) && recipe.hops.length
          ? recipe.hops
              .map(
                (h, index) =>
                  `\n${index + 1}. Name: ${hopsNames[index]}, Amount: ${
                    h.amount_g
                  }g, Time: ${h.time_minutes}m`
              )
              .join("")
          : "N/A",
    },
    {
      label: "Yeast",
      value:
        Array.isArray(recipe.yeast) && recipe.yeast.length
          ? recipe.yeast
              .map(
                (y, index) =>
                  `\n${index + 1}. Name: ${yeastsNames[index]}, Temp: ${
                    y.temperature_celsius
                  }°C`
              )
              .join("")
          : "N/A",
    },
    {
      label: "Steps",
      value:
        Array.isArray(recipe.recipe) && recipe.recipe.length
          ? recipe.recipe
              .map(
                (step) =>
                  `\nStep ${step.step_id}: ${step.message || "No message"}`
              )
              .join("")
          : "N/A",
    },
    {
      label: "Fermentation steps",
      value:
        Array.isArray(recipe.notifications) && recipe.notifications.length
          ? recipe.notifications
              .map(
                (note, index) =>
                  `\n${index + 1}. ${note.message} (after ${
                    note.send_after_days
                  } days)`
              )
              .join("")
          : "N/A",
    },
  ];

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const handleRatingChange = async (newValue, recipeId) => {
    try {
      setRating(newValue);

      const response = await axios.post(
        `http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/rate/rating/${recipeId}?rating=${newValue}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${ID_TOKEN}`,
          },
        }
      );

      console.log("Rating submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleReviewSubmit = async (recipeId) => {
    try {
      const response = await axios.post(
        `http://ec2-16-171-28-128.eu-north-1.compute.amazonaws.com:8080/api/brew/rate/review/${recipeId}?review=${reviewText}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${ID_TOKEN}`,
          },
        }
      );
      console.log("Review submitted successfully:", response.data);

      // Optionally clear the input after submission
      setReviewText("");

      // Update the recipe with new review after successful submission
      // Optionally refetch or update the reviews for the recipe.
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            { marginTop: 40 },
            { marginBottom: 30 },
          ]}
        >
          Let's Discover Exciting New Beer Recipes!
        </Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          recipes.map((recipe, index) => (
            <View key={index} style={styles.recipeContainer}>
              <TouchableOpacity
                key={index}
                style={styles.dataContainer}
                onPress={() => openModal(recipe)}
              >
                <Text style={styles.recipeName}>
                  Beer name: {recipe.recipe_name}{" "}
                </Text>
                <Text style={styles.date}>
                  Creation date: {convertTimestampToDate(recipe.time_created)}
                </Text>
                <Text style={styles.recipeName}>Created by: Adi Kapuri</Text>
                <Text style={styles.recipeName}>
                  Rating: {recipe.averageRating.toFixed(1)}
                </Text>
                <Text style={styles.touchOrder}>Touch to see more details</Text>
              </TouchableOpacity>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingTitle}>Rate the recipe (1-5): </Text>
                <TextInput
                  style={styles.ratingInput}
                  placeholder="rate"
                  placeholderTextColor={COLORS.date}
                  value={rating}
                  onChangeText={setRating}
                />
              </View>
              <Button
                title="Submit Rating"
                onPress={() => handleRatingChange(rating, recipe.recipe_id)}
              />

              {recipe.reviews && recipe.reviews.length > 0 ? (
                <View style={styles.reviewsContainer}>
                  <Text style={styles.reviewsTitle}>Reviews:</Text>
                  {recipe.reviews.map((review, reviewIndex) => (
                    <View key={reviewIndex} style={styles.review}>
                      <Text style={styles.reviewComment}>
                        Review: {review.review || "No review"}
                      </Text>
                      <Text style={styles.reviewDate}>
                        Date: {convertTimestampToDate(review.reviewDate)}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.reviewsContainer}>
                  <Text style={styles.reviewsTitle}>
                    There are no reviews on this recipe yet
                  </Text>
                </View>
              )}
              <Text style={styles.reviewsTitle}>Add a review:</Text>
              <TextInput
                style={styles.input}
                placeholder="Write your review here"
                placeholderTextColor={COLORS.date}
                value={reviewText}
                onChangeText={setReviewText}
              />
              <Button
                title="Submit Review"
                onPress={() => handleReviewSubmit(recipe.recipe_id)}
              />
            </View>
          ))
        )}

        {selectedRecipe && (
          <Modal
            visible={!!selectedRecipe}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <Text style={styles.modalTitle}>Recipe Details:</Text>
                  <FlatList
                    data={getRecipeDetails(selectedRecipe)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderRecipeDetail}
                  />
                  <Button title="Close" onPress={closeModal} />
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ExploreRecipes;
