import Head from "next/head";
import React, { useState } from "react";

import Banner from "../components/banner";
import StoresSection from "../components/StoresSection.component";

import { fetchCoffeeStores, generateHrefs } from "../lib/coffee-stores";

const sectionTitles = ["Stores Near You", "Toronto Stores"];

export const getStaticProps = async (context) => {
    const output = await fetchCoffeeStores();
    return {
        props: {
            coffeeStores: output.results,
            sectionTitles,
        },
    };
};

export default function Home(props) {
    const coffeeStores = props.coffeeStores;
    const [ctaText, setCtaText] = useState("View stores nearby");
    const [stores, setStores] = useState(coffeeStores);

    const handleClickCta = () => {
        ctaText === "Loading..."
            ? setCtaText("View stores nearby")
            : setCtaText("Loading...");
    };

    stores.forEach((store) => {
        if (!store.href) {
            generateHrefs(stores, setStores);
        }
    });

    console.log("stores", stores);

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
