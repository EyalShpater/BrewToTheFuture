import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  Dimensions,
  PanResponder,
} from "react-native";
import styles from "./screenheader.style";

const windowWidth = Dimensions.get("window").width;

//menu
const Menu = ({ isVisible, closeMenu, userId }) => {
  const navigation = useNavigation();
  const [gestureState, setGestureState] = useState({ dx: 0, dy: 0 });

  const handlePanResponderMove = (e, gestureState) => {
    if (gestureState.dx < -50) {
      closeMenu();
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName, { userId });
    closeMenu();
  };

  const handleMenuPress = () => {
    if (gestureState.dx === 0) {
      closeMenu();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeMenu}
    >
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={handleMenuPress}
        activeOpacity={1} // Prevents pressing on the background to close menu
      >
        <View
          style={[styles.menu, { width: windowWidth * 0.5 }]}
          {...panResponder.panHandlers}
        >
          {/* <ImageBackground
          source={images.seeds}
          style={[styles.menu, { width: windowWidth * 0.5 }]}
          {...panResponder.panHandlers}
        > */}
          <TouchableOpacity onPress={() => handleNavigation("CreateRecipeOne")}>
            <Text style={styles.menuText}>Add new recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation("SavedRecipes")}>
            <Text style={styles.menuText}>My saved recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation("Brew")}>
            <Text style={styles.menuText}>Current brewing</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation("AIRecipe")}>
            <Text style={styles.menuText}>Get AI beer recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation("ExploreRecipes")}>
            <Text style={styles.menuText}>Explore new beers</Text>
          </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
      </TouchableOpacity>
    </Modal>
  );
};

//menu button
const ScreenHeaderBtn = ({ iconUrl, userId, dimension, handlePress }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View>
      <TouchableOpacity style={styles.btnContainer} onPress={toggleMenu}>
        <Image
          source={iconUrl}
          resizeMode="cover"
          style={styles.btnContainer}
        />
      </TouchableOpacity>
      <Menu
        isVisible={menuVisible}
        closeMenu={() => setMenuVisible(false)}
        userId={userId}
      />
    </View>
  );
};

export default ScreenHeaderBtn;
