var firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../therapy-notes-sys-firebase-adminsdk-qmjqx-2817da45bf.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});


module.exports = firebaseAdmin