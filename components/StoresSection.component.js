import React from "react";

import Card from "./card";

const StoresSection = ({ coffeeStores, sectionTitle }) => {
    return (
        <section className='stores-section'>
            <h3 className='stores-section__title'>{sectionTitle}</h3>
            <div className='stores-section__cards'>
                {coffeeStores.map((store) => {
                    return <Card key={store.fsq_id} coffeeStore={store} />;
                })}
            </div>
        </section>
    );
};

export default StoresSection;
