import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
    // lat: 55.801437817225455,
    // lng: 37.69806245769561,
    const { location, limit } = req.query;
    const arr = location.split(",");
    const coords = {
        lat: arr[0],
        lng: arr[1],
    };

    try {
        const coffeeStores = await fetchCoffeeStores(coords, false, limit);

        res.status(200);
        res.json(coffeeStores);
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.json(`Error occured: ${error.message}`);
    }
};

export default getCoffeeStoresByLocation;

// import { fetchCoffeeStores } from "../../lib/coffee-stores";

// const getCoffeeStoresByLocation = async (req, res) => {
//   try {
//     const { latLong, limit } = req.query;
//     const response = await fetchCoffeeStores(latLong, limit);
//     res.status(200);
//     res.json(response);
//   } catch (err) {
//     console.error("There is an error", err);
//     res.status(500);
//     res.json({ message: "Oh no! Something went wrong", err });
//   }

//   //return
// };

// export default getCoffeeStoresByLocation;
