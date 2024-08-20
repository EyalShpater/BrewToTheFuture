import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  Dimensions,
  PanResponder,
} from "react-native";
import styles from "./UserManagementMenu.styles";

const windowWidth = Dimensions.get("window").width;

const Menu = ({ isVisible, closeMenu }) => {
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
    navigation.navigate(screenName);
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
          <TouchableOpacity onPress={() => handleNavigation("CreateRecipeOne")}>
            <Text style={styles.menuText}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation("SavedRecipes")}>
            <Text style={styles.menuText}>Change account</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const UserManagementMenu = ({ iconUrl, dimension, handlePress }) => {
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
      <Menu isVisible={menuVisible} closeMenu={() => setMenuVisible(false)} />
    </View>
  );
};

export default UserManagementMenu;
