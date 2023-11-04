import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const Root = () => {
    const router = useRouter();
    const page = Object.keys(router.query)[0];
    const url = Object.values(router.query)[0];
    return (
        <>
            <Head>
                <title>{`${url}`}</title>
            </Head>
            <br />
            <br />
            <br />
            <h1>
                <Link className='navigation__link' href='/'>
                    Back to Homepage
                </Link>
                <br />
                Page {`'${page}'`} rendered for a dynamic route localhost:3000/
                {`${url}`}
            </h1>
            <br />
            <br />
            <br />
        </>
    );
};

export default Root;
