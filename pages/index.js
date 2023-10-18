import { useState } from "react";

import Head from "next/head";

import Banner from "../components/banner";
import StoresSection from "../components/StoresSection.component";

import { fetchCoffeeStores } from "../lib/coffee-stores";

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
    const stores = props.coffeeStores;
    const [ctaText, setCtaText] = useState("View stores nearby");

    const handleClickCta = () => {
        setCtaText("Loading...");
        // handleTrackLocation();
    };

    return (
        <>
            <Head>
                <title>Coffee Connoisseur</title>
            </Head>
            <Banner ctaText={ctaText} handleClickCta={handleClickCta} />
            {stores.length > 0 &&
                props.sectionTitles.map((sectionTitle) => (
                    <StoresSection
                        key={sectionTitle}
                        coffeeStores={stores}
                        sectionTitle={sectionTitle}
                    />
                ))}
        </>
    );
}
