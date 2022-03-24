const client = require("firebase");
const admin = require("firebase-admin");
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMSTckmWf8NmZ1Z_FHwzIoZG6oiSoURoo",
    authDomain: "think-plus-5cc5c.firebaseapp.com",
    projectId: "think-plus-5cc5c",
    storageBucket: "think-plus-5cc5c.appspot.com",
    messagingSenderId: "820529962286",
    appId: "1:820529962286:web:2ce1cf40291ff00c6beebf",
    measurementId: "G-0W2J9B6WEX"
};
client.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert({
        "type": process.env.FIREBASE_TYPE,
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": process.env.FIREBASE_AUTH_URI,
        "token_uri": process.env.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
    }),
});
module.exports = {
    client: client,
    admin: admin
};
