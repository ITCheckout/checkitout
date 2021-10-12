export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyBbtBm4YsEzXvoxOZhKzJTxKqKz8RZIGm8",
    authDomain: "checkitout-mu.firebaseapp.com",
    projectId: "checkitout-mu",
    storageBucket: "checkitout-mu.appspot.com",
    messagingSenderId: "916988750934",
    appId: "1:916988750934:web:505e092e05c89044835ff7",
    measurementId: "G-VJ8CCPXF74"
  },
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbtBm4YsEzXvoxOZhKzJTxKqKz8RZIGm8",
  authDomain: "checkitout-mu.firebaseapp.com",
  projectId: "checkitout-mu",
  storageBucket: "checkitout-mu.appspot.com",
  messagingSenderId: "916988750934",
  appId: "1:916988750934:web:505e092e05c89044835ff7",
  measurementId: "G-VJ8CCPXF74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);