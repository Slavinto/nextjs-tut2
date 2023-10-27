const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee-stores");
console.log({ table });

const createCoffeeStore = async (req, res) => {
    if (req.method === "POST") {
        console.log("finding a DB record by id");
        // find a record in DB
        const record = table.find("recFEmkQTn78uzpW9", function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Retrieved", record.id);
        });
        record
            ? res.json({ message: "record found" })
            : res.json({ message: "record not found" });
        //     const findCoffeeStoreRecords = await table
        //         .select({ filterByFormula: `id="ididididididid"` })
        //         .firstPage();
        //     console.log(findCoffeeStoreRecords);
        //     if (findCoffeeStoreRecords.length !== 0) {
        //         res.json(findCoffeeStoreRecords);
        //     } else {
        //         // create a record
        //         res.json({ message: `create a record` });
        //     }
    }
};
export default createCoffeeStore;

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
