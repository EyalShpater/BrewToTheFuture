import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9oZo_7RGH2Jn3dJT-Ed6Nr4KbiHkbpO0",
  authDomain: "brew-to-the-future-24354.firebaseapp.com",
  projectId: "brew-to-the-future-24354",
  storageBucket: "brew-to-the-future-24354.appspot.com",
  messagingSenderId: "134554762243",
  appId: "1:134554762243:web:d3a54df814cbc794c32236",
  measurementId: "G-60XFZNBM75",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
