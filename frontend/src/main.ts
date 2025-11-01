import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyC-8AOJr7_Pqpx9Ov4M1K7ZuRs-O9zbyUk",
  authDomain: "petstore-175dc.firebaseapp.com",
  projectId: "petstore-175dc",
  storageBucket: "petstore-175dc.firebasestorage.app",
  messagingSenderId: "739011864815",
  appId: "1:739011864815:web:07da305232a37be74d931a",
  measurementId: "G-KMD2NDVCCT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
