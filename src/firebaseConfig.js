// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD5MjGDwqRwety1Fq_A21vzou22CvvUtek',
    authDomain: 'smartglasses-78a64.firebaseapp.com',
    projectId: 'smartglasses-78a64',
    storageBucket: 'smartglasses-78a64.appspot.com',
    messagingSenderId: '75089402666',
    appId: '1:75089402666:web:d2251cde9517ac49fc5c53',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
