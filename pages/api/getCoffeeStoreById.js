import { findStoreById } from "../../lib/firebase";

const getCoffeeStoreById = async (req, res) => {
    // checking if current request is of type get if no exiting instantly
    if (req.method !== "GET") {
        res.status(400).json({ message: "error - invalid request method" });
        return;
    }

    // console.log({ ...req.query });
    // console.log({ ...req.body });

    // destructuring request query object properties into variables
    const { id } = req.query;
    // if request doesn`t provide id or name values exit instantly
    if (!id) {
        res.status(400).json({
            message: "invalid request: check id or name values",
        });
        return;
    }

    try {
        // trying to find a store in database by id
        const store = await findStoreById(id);

        // if store exists return a store object and exit
        if (store) res.status(200).json({ store });
        return;
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export default getCoffeeStoreById;

// import { findRecordByFilter } from "../../lib/airtable";

// const getCoffeeStoreById = async (req, res) => {
//   const { id } = req.query;

//   try {
//     if (id) {
//       const records = await findRecordByFilter(id);

//       if (records.length !== 0) {
//         res.json(records);
//       } else {
//         res.json({ message: `id could not be found` });
//       }
//     } else {
//       res.status(400);
//       res.json({ message: "Id is missing" });
//     }
//   } catch (error) {
//     res.status(500);
//     res.json({ message: "Something went wrong", error });
//   }
// };

// export default getCoffeeStoreById;
