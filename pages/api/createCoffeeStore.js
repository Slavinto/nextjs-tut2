import { findStoreById, createStore, getVotes } from "../../lib/firebase";

const createCoffeeStore = async (req, res) => {
    // checking if current request is of type post if no exiting instantly
    if (req.method !== "POST")
        res.status(400).json({ message: "error - invalid request method" });

    // console.log({ ...req.query });
    // console.log({ ...req.body });

    // destructuring request body object properties into variables
    const { id, href, name, address, neighbourhood, link, imgUrl } = req.body;

    // if request doesn`t provide id or name values exit instantly
    if (!id || !name)
        res.status(400).json({
            message: "invalid request: check id or name values",
        });

    try {
        let store;
        // trying to find a store in database by id
        store = await findStoreById(id);

        // if store exists return a store object and exit
        if (store?.id || store?.name)
            res.status(200).json({ store: { ...store } });

        const votes = await getVotes(id);

        // if a store doesn`t exist create a store
        const newStore = {
            id: `${id}`,
            href: `${href}`,
            name: `${name}`,
            address: `${address}` || "",
            neighbourhood: `${neighbourhood}` || "",
            link: `${link}` || "",
            imgUrl: `${imgUrl}`,
            votes,
        };

        // creating a store in a database
        store = await createStore(newStore);

        if (!store)
            res.status(500).json({
                message: "error happened when creating a store",
            });

        res.status(201).json({
            message: `Store was created successfully: `,
            store: { ...store },
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
