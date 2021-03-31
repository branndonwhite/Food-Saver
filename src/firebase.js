import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKER",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);

export default firebase;