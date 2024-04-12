
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAj9I7PmwQLDgKKsp28VBYIWLM2scpV8FM",
  authDomain: "invoice-generating-syste-706ed.firebaseapp.com",
  projectId: "invoice-generating-syste-706ed",
  storageBucket: "invoice-generating-syste-706ed.appspot.com",
  messagingSenderId: "470263909848",
  appId: "1:470263909848:web:42675f7be889df74b3f6ad",
  measurementId: "G-TQFY77LPK4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { app,auth};