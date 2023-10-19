import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});
const storesQuantity = "8";
export const defaultImgUrl =
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80";

const getUrlForCoffeeStores = (query, latLng, limit) => {
    const foursquareApiUrl = "https://api.foursquare.com/v3/places/search?";

    return `${foursquareApiUrl}&query=${query}&ll=${latLng}&limit=${limit}`;
};

const getUnsplashImgUrls = async () => {
    const request = await unsplash.search.getPhotos({
        query: "coffee store",
        page: 1,
        perPage: +storesQuantity * 2,
        orientation: "landscape",
    });

    return request.response.results.map(
        (unsplashObj) => unsplashObj.urls.small
    );
};

export const fetchCoffeeStores = async (
    coords = {
        lat: 55.801437817225455,
        lng: 37.69806245769561,
    },
    fromClient = false
) => {
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
                `${coords.lat}%2C${coords.lng}` || null,
                `${+storesQuantity}`
            ),
            options
        );
        const data = await response.json();
        const coffeeStores = data.results;
        let imgUrls = await getUnsplashImgUrls();

        if (imgUrls.length === 0)
            imgUrls = Array.from(
                { length: +storesQuantity * 2 },
                () => defaultImgUrl
            );
        return coffeeStores.map((store, idx) => {
            store = {
                id: store.fsq_id,
                href: `coffee-store/${store.fsq_id}`,
                name: store.name,
                address: store.location.address
                    ? store.location.address
                    : store.location.cross_street
                    ? store.location.cross_street
                    : null,
                neighbourhood: store.location.locality,
                link: store.link,
                imgUrl: fromClient
                    ? imgUrls[idx + +storesQuantity]
                    : imgUrls[idx],
            };
            return store;
        });
    } catch (error) {
        console.log(error.message);
    }
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
