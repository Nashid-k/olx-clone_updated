import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

// Correct Firebase Configuration
const firebaseConfiguration = {
  apiKey: "AIzaSyDCYd0DaIOuLEDDXoIHAqi-XB_v-eDtwIs",
  authDomain: "olx-clone-7c576.firebaseapp.com",
  projectId: "olx-clone-7c576",
  storageBucket: "olx-clone-7c576.appspot.com",
  messagingSenderId: "239567904317",
  appId: "1:239567904317:web:51eed1f1d39c1c69005454",
};

// Initialize Firebase
const app = initializeApp(firebaseConfiguration);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// Signup Function
const signup = async (name, email, password, navigate) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Store user in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful! Redirecting...");
    navigate("/login");
  } catch (error) {
    console.error("Signup Error:", error);
    toast.error('Email already in use'); 
  }
};

// Login Function
const login = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
    navigate("/home");
  } catch (error) {
    console.error("Login Error:", error);
    toast.error('Email or password is incorrect'); 
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error("Logout Error:", error);
    toast.error("Error logging out!");
  }
};

// Export services
export { auth, db, signup, login, logout, googleProvider, storage };
