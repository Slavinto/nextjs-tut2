const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} = require("firebase-admin/firestore");

const {
    initializeApp,
    applicationDefault,
    cert,
    getApps,
} = require("firebase-admin/app");

if (getApps().length === 0) {
    const serviceAccount = require("../../discover-local-coffee-stores-c91ba310d512.json");
    initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

export default db;
