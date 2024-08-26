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
  Alert,
} from "react-native";
import styles from "./UserManagementMenu.styles";
import { auth } from "../../../firebaseConfig";
import { deleteUser } from "firebase/auth";

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

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              await deleteUser(user);
              Alert.alert("Success", "Your account has been deleted.");
              navigation.navigate("SignIn");
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]
    );
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
          <TouchableOpacity onPress={() => handleNavigation("SignIn")}>
            <Text style={styles.menuText}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAccount}>
            <Text style={styles.menuText}>Delete account</Text>
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
