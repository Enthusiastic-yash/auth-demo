import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDODy_ZL1rmuOo6qi-1jM9D-ZBSKipXW_I",
  authDomain: "app-auth-d945d.firebaseapp.com",
  projectId: "app-auth-d945d",
  storageBucket: "app-auth-d945d.appspot.com",
  messagingSenderId: "376869913745",
  appId: "1:376869913745:web:063dd59e180a554a8deb30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
