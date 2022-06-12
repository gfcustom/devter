import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUsw7MKYv3MjOsLGOr5pnJtCyYaBtaHfQ",
  authDomain: "mejor-momento-gfcustom.firebaseapp.com",
  projectId: "mejor-momento-gfcustom",
  storageBucket: "mejor-momento-gfcustom.appspot.com",
  messagingSenderId: "121095537345",
  appId: "1:121095537345:web:717a0b77af1e91dd2b4a40",
  measurementId: "G-X6M7DL4Q2W",
};

initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  console.log(user);
  let displayName, photoURL;
  if (user) {
    if (user.user) {
      displayName = user.user.displayName;
      photoURL = user.user.photoURL;
    } else {
      displayName = user.displayName;
      photoURL = user.photoURL;
    }

    return {
      avatar: photoURL,
      username: displayName,
    };
  } else {
    return null;
  }
};

export const onAuthStateChanged = (onChange) => {
  return getAuth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters(firebaseConfig);
  const auth = getAuth();
  return signInWithPopup(auth, googleProvider);
};
