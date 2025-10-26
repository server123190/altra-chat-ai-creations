import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdp7caF5F6WE16ZsNjBSiDwVV7bCAr8pY",
  authDomain: "tumhara-ai.firebaseapp.com",
  projectId: "tumhara-ai",
  storageBucket: "tumhara-ai.appspot.com",
  messagingSenderId: "349610181497",
  appId: "1:349610181497:web:238d01846d787307efa5a8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logOut = () => signOut(auth);
