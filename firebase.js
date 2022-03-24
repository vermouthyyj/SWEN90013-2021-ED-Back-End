const client = require("firebase");
const admin = require("firebase-admin");
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhAWvE2ukcYYvmvxOPtkwm9359JSyWuDo",
    authDomain: "educationdesign-5bce6.firebaseapp.com",
    projectId: "educationdesign-5bce6",
    storageBucket: "educationdesign-5bce6.appspot.com",
    messagingSenderId: "879790722904",
    appId: "1:879790722904:web:d58bcb94a3b7f17e565f2d",
    measurementId: "G-53V755QWJT"
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
