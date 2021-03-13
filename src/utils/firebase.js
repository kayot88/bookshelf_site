import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWAcf8Uyvm3ZEy3NHfaAiMOnEIOakzXxQ",
  authDomain: "nasashelf.firebaseapp.com",
  projectId: "nasashelf",
  storageBucket: "nasashelf.appspot.com",
  messagingSenderId: "781758350697",
  appId: "1:781758350697:web:600544cf98db6492baa9f8",
  measurementId: "G-NZSTZMTPBE",
};
// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);

export { firebase };
