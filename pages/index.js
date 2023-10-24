import Head from "next/head";

import Banner from "../components/banner";
import StoresSection from "../components/StoresSection.component";
import useTrackLocation from "../hooks/use-track-location";

import { fetchCoffeeStores } from "../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

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
    const { storesState, dispatch } = useContext(StoreContext);
    const { location } = storesState;
    const { coffeeStores: localCoffeeStores } = storesState;
    const [fetchStoresError, setFetchStoresError] = useState("");
    const { locationErrorMessage, handleTrackLocation, isFindingLocation } =
        useTrackLocation();

    useEffect(() => {
        if (location) {
            const arr = location.split(",");
            const coords = {
                lat: arr[0],
                lng: arr[1],
            };
            try {
                (async () => {
                    const response = await fetch(
                        `/api/getCoffeeStoresByLocation?location=${location}&fromClient=false&limit=30`
                    );
                    const coffeeStores = await response.json();

                    dispatch({
                        type: ACTION_TYPES.SET_COFFEE_STORES,
                        payload: {
                            coffeeStores,
                        },
                    });
                })();
                fetchStoresError && setFetchStoresError("");
            } catch (error) {
                setFetchStoresError(error.message);
                console.log(error.message);
            }
        }
    }, [location]);

    const handleClickCta = () => {
        handleTrackLocation();
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
            {localCoffeeStores?.length > 0 && (
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
