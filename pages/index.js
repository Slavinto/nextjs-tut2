import Head from "next/head";

import Banner from "../components/banner";
import StoresSection from "../components/StoresSection.component";
import useTrackLocation from "../hooks/use-track-location";

import { fetchCoffeeStores } from "../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "./_app";

const sectionTitles = ["Stores Near You", "Moscow Stores"];

export const getStaticProps = async (context) => {
    const coffeeStores = await fetchCoffeeStores();
    return {
        props: {
            coffeeStores,
        },
    };
};

export default function Home(props) {
    // const [coffeeStores, setCoffeeStores] = useState([]);
    const stores = useContext(StoreContext);
    let localCoffeeStores = [];

    // console.log(storesData.storesState.coffeeStores.length);
    // if (storesData.storesState.coffeeStores.length === 0) {
    //     storesData.dispatch({
    //         type: ACTION_TYPES.SET_COFFEE_STORES,
    //         payload: {
    //             coffeeStores,
    //         },
    //     });
    // }
    const [fetchStoresError, setFetchStoresError] = useState("");
    const {
        location,
        locationErrorMessage,
        handleTrackLocation,
        isFindingLocation,
    } = useTrackLocation();
    // const storesInfo = useContext(StoreContext);
    // console.log({ storesInfo });

    useEffect(() => {
        if (location) {
            try {
                const arr = location.split(",");
                const coords = {
                    lat: arr[0],
                    lng: arr[1],
                };
                (async () => {
                    setCoffeeStores(await fetchCoffeeStores(coords, true));
                })();
            } catch (error) {
                setFetchStoresError(error.message);
                console.log(error.message);
            }
        }
    }, [location]);

    const handleClickCta = () => {
        handleTrackLocation();
        if (location) {
        }
    };

    return (
        <>
            <Head>
                <title>Coffee Connoisseur</title>
            </Head>
            <Banner
                ctaText={
                    !isFindingLocation ? "View stores nearby" : "Loading..."
                }
                handleClickCta={handleClickCta}
            />
            {locationErrorMessage && (
                <h3 style={{ padding: "2rem 0rem" }}>
                    Something went wrong ({locationErrorMessage})
                </h3>
            )}
            {fetchStoresError && (
                <h3 style={{ padding: "2rem 0rem" }}>
                    Something went wrong ({fetchStoresError})
                </h3>
            )}
            {localCoffeeStores.length > 0 && (
                <StoresSection
                    key={sectionTitles[0]}
                    coffeeStores={localCoffeeStores}
                    sectionTitle={sectionTitles[0]}
                />
            )}
            {props.coffeeStores.length > 0 && (
                <StoresSection
                    key={sectionTitles[1]}
                    coffeeStores={props.coffeeStores}
                    sectionTitle={sectionTitles[1]}
                />
            )}
        </>
    );
}
