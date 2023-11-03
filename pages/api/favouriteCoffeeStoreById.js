import { updateStoreVotes } from "../../lib/firebase";

async function favouriteCoffeeStoreById(req, res) {
    if (req.method !== "PUT")
        res.status(403).json({ message: "invalid request method" });
    try {
        const store = await updateStoreVotes(req.body.id);
        res.status(200).json({
            store,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong " + error.message,
        });
    }
}

export default favouriteCoffeeStoreById;

// import {
//   table,
//   findRecordByFilter,
//   getMinifiedRecords,
// } from "../../lib/airtable";

// const favouriteCoffeeStoreById = async (req, res) => {
//   if (req.method === "PUT") {
//     try {
//       const { id } = req.body;

//       if (id) {
//         const records = await findRecordByFilter(id);

//         if (records.length !== 0) {
//           const record = records[0];

//           const calculateVoting = parseInt(record.voting) + 1;
//           // update a record

//           const updateRecord = await table.update([
//             {
//               id: record.recordId,
//               fields: {
//                 voting: calculateVoting,
//               },
//             },
//           ]);

//           if (updateRecord) {
//             const minifiedRecords = getMinifiedRecords(updateRecord);
//             res.json(minifiedRecords);
//           }
//         } else {
//           res.json({ message: "Coffee store id doesn't exist", id });
//         }
//       } else {
//         res.status(400);
//         res.json({ message: "Id is missing" });
//       }
//     } catch (error) {
//       res.status(500);
//       res.json({ message: "Error upvoting coffee store", error });
//     }
//   }
// };

// export default favouriteCoffeeStoreById;
