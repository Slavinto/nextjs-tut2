import db from "./initFirebaseAdmin";

const stores = db.collection("local-coffee-stores");

const findStoreById = async (id) => {
    try {
        const storeRef = stores.doc(id);
        const store = await storeRef.get();
        return store.exists ? { ...store.data() } : null;
    } catch (error) {
        console.log("Error finding store in db");
    }
};

const createCoffeeStore = async (req, res) => {
    // checking if current request is of type post if no exiting instantly
    if (req.method !== "POST")
        res.json({ message: "error - invalid request method" });

    console.log({ ...req.query });
    console.log({ ...req.body });
    // destructuring request body object properties into variables
    const { id, href, name, address, neighbourhood, link, imgUrl, votes } =
        req.body;
    // if request doesn`t provide id or name values exit instantly
    if (!id || !name)
        res.status(400).json({
            message: "invalid request: check id or name values",
        });

    try {
        // trying to find a store in database by id
        const store = await findStoreById(id);

        // if store exists return a store object and exit
        if (store) res.json({ store });

        // if a store doesn`t exist create a store
        const newStore = {
            id,
            href,
            name,
            address,
            neighbourhood,
            link,
            imgUrl,
            votes,
        };

        // creating a store in a database
        const docRef = stores.doc(newStore.id);
        await docRef.set(newStore);
        // checking that the store has been created
        // and also to output the object value to response=>createdStore
        const createdStore = await findStoreById(newStore.id);

        res.json({
            message: `Store was created successfully: `,
            createdStore: { ...createdStore },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export default createCoffeeStore;

// const testStore = {
//     id: "store.fsq_id",
//     href: `coffee-store/store.fsq_id`,
//     name: "store.name",
//     address: "store.location.address",
//     neighbourhood: "store.location.locality",
//     link: "store.link",
//     imgUrl: "fromClient ? imgUrls[idx + +limit] : imgUrls[idx]",
//     votes: 100,
// };

// import {
//   table,
//   getMinifiedRecords,
//   findRecordByFilter,
// } from "../../lib/airtable";

// const createCoffeeStore = async (req, res) => {
//   if (req.method === "POST") {
//     //find a record

//     const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

//     try {
//       if (id) {
//         const records = await findRecordByFilter(id);

//         if (records.length !== 0) {
//           res.json(records);
//         } else {
//           //create a record
//           if (name) {
//             const createRecords = await table.create([
//               {
//                 fields: {
//                   id,
//                   name,
//                   address,
//                   neighbourhood,
//                   voting,
//                   imgUrl,
//                 },
//               },
//             ]);

//             const records = getMinifiedRecords(createRecords);
//             res.json(records);
//           } else {
//             res.status(400);
//             res.json({ message: "Id or name is missing" });
//           }
//         }
//       } else {
//         res.status(400);
//         res.json({ message: "Id is missing" });
//       }
//     } catch (err) {
//       console.error("Error creating or finding a store", err);
//       res.status(500);
//       res.json({ message: "Error creating or finding a store", err });
//     }
//   }
// };

// export default createCoffeeStore;
