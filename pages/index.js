import Head from "next/head";

import Banner from "../components/banner";
import StoresSection from "../components/StoresSection.component";
import useTrackLocation from "../hooks/use-track-location";

import { fetchCoffeeStores } from "../lib/coffee-stores";
import { useEffect, useState } from "react";

const sectionTitles = ["Stores Near You", "Moscow Stores"];

export const getStaticProps = async (context) => {
    const coffeeStores = await fetchCoffeeStores();

    return {
        props: {
            coffeeStores,
            sectionTitles,
        },
    };
};

export default function Home(props) {
    const [coffeeStores, setCoffeeStores] = useState([]);
    const [fetchStoresError, setFetchStoresError] = useState("");
    const stores = props.coffeeStores;
    const {
        location,
        locationErrorMessage,
        handleTrackLocation,
        isFindingLocation,
    } = useTrackLocation();

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
            {coffeeStores.length > 0 && (
                <StoresSection
                    key={sectionTitles[0]}
                    coffeeStores={coffeeStores}
                    sectionTitle={sectionTitles[0]}
                />
            )}
            {stores.length > 0 && (
                <StoresSection
                    key={sectionTitles[1]}
                    coffeeStores={stores}
                    sectionTitle={sectionTitles[1]}
                />
            )}
        </>
    );
}
