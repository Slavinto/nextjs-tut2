import React from "react";
import Link from "next/link";

const Navigation = () => {
    return (
        <section className='navigation _container'>
            <ul className='navigation__categories'>
                <li className='navigation__category'>
                    Exercises
                    <ul className='navigation__group'>
                        <li className='navigation__item'>
                            <Link
                                className='navigation__link'
                                href='/courses/nextjs'
                            >
                                &nbsp; &nbsp; &nbsp; &nbsp; 01 Next.js
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__category'>
                    Next Category Placeholder
                    <ul className='navigation__group'>
                        <li className='navigation__item'>
                            <Link
                                className='navigation__link'
                                href='/courses/nextjs'
                            >
                                &nbsp; &nbsp; &nbsp; &nbsp; 01 SomeOther.js
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    );
};

export default Navigation;
