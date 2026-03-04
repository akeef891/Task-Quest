import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDoJ_AxpuCwBI04M2Ew58-XRvbwWs2A0vI",
  authDomain: "expense-tracker-pro-f03c5.firebaseapp.com",
  projectId: "expense-tracker-pro-f03c5",
  storageBucket: "expense-tracker-pro-f03c5.firebasestorage.app",
  messagingSenderId: "963388840791",
  appId: "1:963388840791:web:808587bbedadec94e0fc12",
  measurementId: "G-P0HX64WKV7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
