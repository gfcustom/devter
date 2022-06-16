import { initializeApp } from "@firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getStorage, ref } from "firebase/storage"
import {
  getFirestore,
  collection,
  Timestamp,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore/lite"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUsw7MKYv3MjOsLGOr5pnJtCyYaBtaHfQ",
  authDomain: "mejor-momento-gfcustom.firebaseapp.com",
  projectId: "mejor-momento-gfcustom",
  storageBucket: "mejor-momento-gfcustom.appspot.com",
  messagingSenderId: "121095537345",
  appId: "1:121095537345:web:717a0b77af1e91dd2b4a40",
  measurementId: "G-X6M7DL4Q2W",
}

let db
let app

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
} catch (e) {
  console.log("ERROR EN CLIENTJS: ", e)
}

const mapUserFromFirebaseAuthToUser = (user) => {
  let displayName, photoURL, uid
  if (user) {
    if (user.user) {
      displayName = user.user.displayName
      photoURL = user.user.photoURL
      uid = user.user.uid
    } else {
      displayName = user.displayName
      photoURL = user.photoURL
      uid = user.uid
    }

    return {
      avatar: photoURL,
      username: displayName,
      uid,
    }
  } else {
    return null
  }
}

export const onAuthStateChanged = (onChange) => {
  return getAuth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters(firebaseConfig)
  const auth = getAuth()
  return signInWithPopup(auth, googleProvider)
}

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = async () => {
  const q = query(collection(db, "devits"), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)

  const timeline = []
  querySnapshot.forEach((doc) => {
    const id = doc.id
    const data = doc.data()
    const { createdAt } = data

    timeline.push({ ...data, id, createdAt: +createdAt.toDate() })
  })
  return timeline
}

export const uploadImage = (file) => {
  const storage = getStorage(app)
  const task = ref(storage, `images/${file.name}`)
  return task
}
