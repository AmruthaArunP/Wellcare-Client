import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAlvsN1t5hA506Z5Yr55i9HRqoa4QhW_cw",
  authDomain: "well-care-7ec26.firebaseapp.com",
  projectId: "well-care-7ec26",
  storageBucket: "well-care-7ec26.appspot.com",
  messagingSenderId: "823709639548",
  appId: "1:823709639548:web:dc0e1e5ca1c120d3337af9",
  measurementId: "G-8ML76X7TPE"
};

const Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);
const storage = getStorage(Firebase)

export { Firebase, auth, storage };
