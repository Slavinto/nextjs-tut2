import Head from "next/head";
import React, { useState } from "react";

import Banner from "../components/banner";
import StoresSection from "../components/StoresSection.component";

const testData = {
    id: 0,
    name: "StrangeLove CoffeeStrangeLove CoffeeStrangeLove CoffeeStrangeLove CoffeeStrangeLove Coffee",
    imgUrl: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    websiteUrl: "https://www.strangelovecoffee.ca/",
    address: "983 Queen St E, Toronto, ON M4M 1K2",
    neighbourhood: "at King and Spadina",
};

export default function Home(props) {
    const [ctaText, setCtaText] = useState("View stores nearby");
    const handleClickCta = () => {
        ctaText === "Loading..."
            ? setCtaText("View stores nearby")
            : setCtaText("Loading...");
    };

    return (
        <>
            <Head>
                <title>Coffee Connoisseur</title>
            </Head>
            <Banner ctaText={ctaText} handleClickCta={handleClickCta} />

            <StoresSection
                coffeeStore={testData}
                sectionTitle={"Stores Near You"}
            />
            <StoresSection
                coffeeStore={testData}
                sectionTitle={"Toronto Stores"}
            />
        </>
    );
}
