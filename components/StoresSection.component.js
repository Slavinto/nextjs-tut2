import React from "react";

import Card from "./card";

const StoresSection = ({ coffeeStore, sectionTitle }) => {
    return (
        <section className='stores-section'>
            <h3 className='stores-section__title'>{sectionTitle}</h3>
            <div className='stores-section__cards'>
                <Card coffeeStore={coffeeStore} />
                <Card coffeeStore={coffeeStore} />
                <Card coffeeStore={coffeeStore} />
                <Card coffeeStore={coffeeStore} />
            </div>
        </section>
    );
};

export default StoresSection;
