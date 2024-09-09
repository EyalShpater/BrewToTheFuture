// import * as React from "react";
// import Box from "@mui/material/Box";
// import Rating from "@mui/material/Rating";
// import Typography from "@mui/material/Typography";

// const BasicRating = ({ value, onChange }) => {
//   return (
//     <Box sx={{ "& > legend": { mt: 2 } }}>
//       <Typography component="legend">Rate this recipe:</Typography>
//       <Rating
//         name="simple-controlled"
//         value={value} // This value comes from the props
//         onChange={(event, newValue) => {
//           onChange(newValue); // Call the passed onChange function with the new value
//         }}
//       />
//     </Box>
//   );
// };

// export default BasicRating;

import React from "react";
import { View, Text } from "react-native";
import { Rating } from "react-native-ratings"; // Ensure you have this package installed

const BasicRating = ({ value, onChange }) => {
  return (
    <View style={{ alignItems: "center", margin: 10 }}>
      <Text style={{ marginBottom: 10 }}>Rate this recipe:</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        startingValue={value}
        onFinishRating={(newValue) => onChange(newValue)}
      />
    </View>
  );
};

export default BasicRating;

// import React from "react";
// import { View, Text } from "react-native";
// import StarRating from "react-native-star-rating";

// const BasicRating = ({ value, onChange }) => {
//   return (
//     <View style={{ alignItems: "center", margin: 10 }}>
//       <Text style={{ marginBottom: 10 }}>Rate this recipe:</Text>
//       <StarRating
//         disabled={false}
//         maxStars={5}
//         rating={value}
//         starSize={30}
//         fullStarColor="gold"
//         emptyStarColor="gray"
//         selectedStar={(newValue) => onChange(newValue)}
//       />
//     </View>
//   );
// };

// export default BasicRating;
