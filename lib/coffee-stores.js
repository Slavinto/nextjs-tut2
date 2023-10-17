const getUrlForCoffeeStores = (query, latLng, limit) => {
    const foursquareApiUrl = "https://api.foursquare.com/v3/places/search?";

    return `${foursquareApiUrl}&query=${query}&ll=${latLng}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
    };

    try {
        const response = await fetch(
            getUrlForCoffeeStores(
                "coffee%20stores",
                "55.767992342164085%2C37.68270398542306",
                "8"
            ),
            options
        );
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

    
export const generateHrefs = (stores, setStores) => {
  const storesArr = stores.map((store) =>
      !store.href
          ? { ...store, href: `coffee-store/${store.fsq_id}` }
          : store
  );
  setStores(storesArr);
};


// //initialize unsplash

// import { createApi } from "unsplash-js";

// // on your node server
// const unsplashApi = createApi({
//   accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
//   //...other fetch options
// });

// const getUrlForCoffeeStores = (latLong, query, limit) => {
//   return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
// };

// const getListOfCoffeeStorePhotos = async () => {
//   const photos = await unsplashApi.search.getPhotos({
//     query: "coffee shop",
//     perPage: 30,
//   });
//   const unsplashResults = photos.response?.results || [];
//   return unsplashResults.map((result) => result.urls["small"]);
// };

// export const fetchCoffeeStores = async (
//   latLong = "43.653833032607096%2C-79.37896808855945",
//   limit = 6
// ) => {
//   const photos = await getListOfCoffeeStorePhotos();
//   const options = {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
//     },
//   };

//   const response = await fetch(
//     getUrlForCoffeeStores(latLong, "coffee", limit),
//     options
//   );
//   const data = await response.json();
//   return data.results.map((result, idx) => {
//     const neighborhood = result.location.neighborhood;
//     return {
//       id: result.fsq_id,
//       address: result.location.address,
//       name: result.name,
//       neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : "",
//       imgUrl: photos.length > 0 ? photos[idx] : null,
//     };
//   });
// };
