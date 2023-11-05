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

// initialising firebase app
if (getApps().length === 0) {
    const privateKey = process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_KEY;
    // .replace(/\\n/g,"\n");
    const serviceAccount = JSON.parse(privateKey);
    initializeApp({ credential: cert(serviceAccount) });
    // const serviceAccount = require("../discover-local-coffee-stores-c91ba310d512.json");
    // initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

export default db;

export const stores = db.collection("local-coffee-stores");

export const findStoreById = async (id) => {
    try {
        const storeRef = stores.doc(id);
        const store = await storeRef.get();
        return store.exists ? { ...store.data() } : null;
    } catch (error) {
        console.log("Error finding store in db");
    }
};

export const createStore = async (storeObj) => {
    try {
        // const { store } = await findStoreById(storeObj.id);
        // if (store) return store;
        const storeRef = stores.doc(storeObj.id);

        await storeRef.set(storeObj);

        // checking that the store has been created
        // and also to output the object value to response=>createdStore
        return await findStoreById(storeObj.id);
    } catch (error) {
        console.log(error.message);
    }
};

export async function getVotes(id) {
    if (!findStoreById(id)) return null;
    const storeRef = stores.doc(id);
    const store = await storeRef.get();
    if (!store.exists) return null;
    const result = store.data();
    return result.votes;
}

export const updateStoreVotes = async (id) => {
    const storeRef = stores.doc(id);
    // making shard db records for counter
    await incrementCounter(storeRef, 10);
    // counting shard records
    const votesCount = await getCount(storeRef);
    // updating store record with new count value
    await storeRef.update({ votes: votesCount });
    // returning updated store object
    return (await storeRef.get()).data();
};

//======================distributed counter implemetation======================
function incrementCounter(docRef, numShards) {
    const shardId = Math.floor(Math.random() * numShards);
    const shardRef = docRef.collection("shards").doc(shardId.toString());
    return shardRef.set({ count: FieldValue.increment(1) }, { merge: true });
}

async function getCount(docRef) {
    const querySnapshot = await docRef.collection("shards").get();
    const documents = querySnapshot.docs;

    let count = 0;
    for (const doc of documents) {
        count += doc.get("count");
    }
    return count;
}
//=============================================================================
