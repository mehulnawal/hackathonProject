import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDO4A-4oCAD7dMtDht9Kzfb53tKofZELSc",
    authDomain: "hackathon-1102025.firebaseapp.com",
    projectId: "hackathon-1102025",
    storageBucket: "hackathon-1102025.firebasestorage.app",
    messagingSenderId: "722042318925",
    appId: "1:722042318925:web:c0b82506c47059ee9e6c04",
    databaseURL: 'https://hackathon-1102025-default-rtdb.firebaseio.com/'
};

export const Firebase = initializeApp(firebaseConfig);