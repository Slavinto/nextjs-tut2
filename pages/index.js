import Head from "next/head";
import React, { useState } from "react";

import Banner from "../components/banner";
import StoresSection from "../components/StoresSection.component";

import coffeeStoresJson from "../data/coffee-stores.json";
const sectionTitles = ["Stores Near You", "Toronto Stores"];

export const getStaticProps = async (context) => {
    return {
        props: {
            coffeeStores: coffeeStoresJson,
            sectionTitles,
        },
    };
};

export default function Home(props) {
    const [ctaText, setCtaText] = useState("View stores nearby");
    const [stores, setStores] = useState(props.coffeeStores);

    const handleClickCta = () => {
        ctaText === "Loading..."
            ? setCtaText("View stores nearby")
            : setCtaText("Loading...");
    };

    const generateHrefs = () => {
        const storesArr = stores.map((store) =>
            !store.href ? { ...store, href: `coffee-store/${store.id}` } : store
        );
        setStores(storesArr);
    };

    stores.forEach((store) => {
        if (!store.href) {
            generateHrefs();
        }
    });

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
