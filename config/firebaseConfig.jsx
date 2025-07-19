//this is for emulatior

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8gzo0qbFSecDb0su46-I34ZvPsNqPc84",
  authDomain: "coaching-guru-5fe4b.firebaseapp.com",
  projectId: "coaching-guru-5fe4b",
  storageBucket: "coaching-guru-5fe4b.firebasestorage.app",
  messagingSenderId: "215545555415",
  appId: "1:215545555415:web:09439a25b209c65fa30392",
  measurementId: "G-N2CPMCB9JG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth;
if(Platform.OS==='web'){
    auth = getAuth(app);
}else{
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
}
export {auth}
export const db = getFirestore(app); // Import Firestore if you need it
const analytics = getAnalytics(app);

// firebaseConfig.jsx
//this is for web and mobile
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyB8gzo0qbFSecDb0su46-I34ZvPsNqPc84",
//       authDomain: "coaching-guru-5fe4b.firebaseapp.com",
//       projectId: "coaching-guru-5fe4b",
//       storageBucket: "coaching-guru-5fe4b.firebasestorage.app",
//       messagingSenderId: "215545555415",
//       appId: "1:215545555415:web:09439a25b209c65fa30392",
//       measurementId: "G-N2CPMCB9JG"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };
