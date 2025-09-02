
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCCHO3HLiSfT0fnXT81kYE65408toPvExo",
    authDomain: "nextmovies-d4a5a.firebaseapp.com",
    projectId: "nextmovies-d4a5a",
    storageBucket: "nextmovies-d4a5a.firebasestorage.app",
    messagingSenderId: "89663799329",
    appId: "1:89663799329:web:f32b2f5eaadcc783cfe360",
    measurementId: "G-37428861YG"
};
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail };
