import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBM1PfLttwfJLfzk7LNBlWQnh9jg8HcinY",
    authDomain: "myqna-a0774.firebaseapp.com",
    projectId: "myqna-a0774",
    storageBucket: "myqna-a0774.appspot.com",
    messagingSenderId: "401088647698",
    appId: "1:401088647698:web:7782ccfb5addd03e8bfecb",
    measurementId: "G-J9SSFWPPKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig