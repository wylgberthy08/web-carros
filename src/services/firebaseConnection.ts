import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJGzwm9zcvrDb7KRIfb4miewlgjP7zjQY",
  authDomain: "webcarros-6291f.firebaseapp.com",
  projectId: "webcarros-6291f",
  storageBucket: "webcarros-6291f.appspot.com",
  messagingSenderId: "179617540160",
  appId: "1:179617540160:web:7ebff0f9a0c4c6c1f757a5",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
