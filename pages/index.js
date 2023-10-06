import Head from "next/head";
import React, { useState } from "react";

import Banner from "../components/banner";

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
        </>
    );
}
