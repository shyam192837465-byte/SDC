import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4m5mq4WZuJZ95seVk7lb38F1WXO_UC3k",
  authDomain: "saranya-dental-clinic.firebaseapp.com",
  projectId: "saranya-dental-clinic",
  storageBucket: "saranya-dental-clinic.firebasestorage.app",
  messagingSenderId: "108050139881",
  appId: "1:108050139881:web:a407afe78f574d8d133e78",
  measurementId: "G-YKK1YHXFYF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, addDoc, serverTimestamp };
