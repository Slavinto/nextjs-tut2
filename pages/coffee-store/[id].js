import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import geoIcon from "../../public/static/icons/places.svg";
import starIcon from "../../public/static/icons/star.svg";
import nearMe from "../../public/static/icons/nearMe.svg";

import { fetchCoffeeStores, defaultImgUrl } from "../../lib/coffee-stores";
import { StoreContext } from "../_app";

export const getStaticPaths = async () => {
    const coffeeStores = await fetchCoffeeStores();
    const storePaths = coffeeStores.map((store) => {
        return {
            params: {
                id: `${store.id}`,
            },
        };
    });
    return {
        paths: storePaths,
        fallback: true,
    };
};

export const getStaticProps = async (props) => {
    const { params } = props;
    const coffeeStores = await fetchCoffeeStores();
    const coffeeStore = coffeeStores.find(
        (store) => store.id.toString() === params.id
    );
    const store = {
        coffeeStore: coffeeStore ? coffeeStore : {},
    };
    return {
        props: { ...store },
    };
};

const isEmpty = (object) => {
    return Object.keys(object).length === 0;
};

const CoffeeStores = (initialProps) => {
    const router = useRouter();
    if (router.isFallback) {
        return <h1>Loading...</h1>;
    }

    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
    const stores = useContext(StoreContext);
    const { coffeeStores } = stores.storesState;
    const id = router.query.id;

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore) && coffeeStores.length > 0) {
            const coffeeStore = coffeeStores.find(
                (store) => store.id.toString() === id
            );
            setCoffeeStore(coffeeStore);
        }
    }, [id]);

    const { name, link, address, imgUrl, neighbourhood } = coffeeStore;
    const handleUpvote = () => {
        console.log("upvote btn pressed");
    };

    return (
        <>
            <Head>
                {name ? (
                    <title>{name}</title>
                ) : (
                    <title>Coffee Connoisseur</title>
                )}
            </Head>
            <article className='store'>
                <Link className='store__home-link' href={"/"}>
                    {" "}
                    ← Back to home
                </Link>
                {name && (
                    <Link className='store__title' href={`${link}`}>
                        <h1>{name}</h1>
                    </Link>
                )}
                <figure className='store__description'>
                    <div className='store__image-container'>
                        <Image
                            className='store__image'
                            width={500}
                            height={300}
                            src={imgUrl || defaultImgUrl}
                            alt='a coffee shop image'
                        ></Image>
                    </div>
                    <div className='store__info'>
                        <div className='store__info-overlay'></div>
                        <div className='store__info-item-container'>
                            <Image
                                className='store__info-item-icon'
                                src={geoIcon}
                                width={20}
                                height={20}
                                alt='geolocation marker icon'
                            ></Image>
                            {address && (
                                <p className='store__address'>{address}</p>
                            )}
                        </div>
                        <div className='store__info-item-container'>
                            <Image
                                className='store__info-item-icon'
                                src={nearMe}
                                width={20}
                                height={20}
                                alt='airplane icon'
                            ></Image>
                            {neighbourhood && (
                                <p className='store__neighbourhood'>
                                    {neighbourhood}
                                </p>
                            )}
                        </div>
                        <div className='store__info-item-container'>
                            <Image
                                className='store__info-item-icon'
                                src={starIcon}
                                width={20}
                                height={20}
                                alt='star icon'
                            ></Image>
                            <p className='store__rating'>{5}</p>
                        </div>
                        <Link
                            className='store__upvote-link banner__cta'
                            href={"#"}
                            onClick={handleUpvote}
                        >
                            Up vote!
                        </Link>
                    </div>
                </figure>
            </article>
        </>
    );
};

export default CoffeeStores;

// import React from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import Head from "next/head";
// import Image from "next/image";

// import useSWR from "swr";

// import cls from "classnames";

// import styles from "../../styles/coffee-store.module.css";
// import { fetchCoffeeStores } from "../../lib/coffee-stores";

// import { StoreContext } from "../../store/store-context";

// import { fetcher, isEmpty } from "../../utils";

// export async function getStaticProps(staticProps) {
//   const params = staticProps.params;

//   const coffeeStores = await fetchCoffeeStores();
//   const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
//     return coffeeStore.id.toString() === params.id; //dynamic id
//   });
//   return {
//     props: {
//       coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
//     },
//   };
// }

// export async function getStaticPaths() {
//   const coffeeStores = await fetchCoffeeStores();
//   const paths = coffeeStores.map((coffeeStore) => {
//     return {
//       params: {
//         id: coffeeStore.id.toString(),
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: true,
//   };
// }

// const CoffeeStore = (initialProps) => {
//   const { useEffect, useState, useContext } = React;
//   const router = useRouter();

//   const id = router.query.id;

//   const [coffeeStore, setCoffeeStore] = useState(
//     initialProps.coffeeStore || {}
//   );

//   const {
//     state: { coffeeStores },
//   } = useContext(StoreContext);

//   const handleCreateCoffeeStore = async (coffeeStore) => {
//     try {
//       const { id, name, voting, imgUrl, neighbourhood, address } = coffeeStore;
//       const response = await fetch("/api/createCoffeeStore", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//           name,
//           voting: 0,
//           imgUrl,
//           neighbourhood: neighbourhood || "",
//           address: address || "",
//         }),
//       });

//       const dbCoffeeStore = await response.json();
//     } catch (err) {
//       console.error("Error creating coffee store", err);
//     }
//   };

//   useEffect(() => {
//     if (isEmpty(initialProps.coffeeStore)) {
//       if (coffeeStores.length > 0) {
//         const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
//           return coffeeStore.id.toString() === id; //dynamic id
//         });
//         setCoffeeStore(findCoffeeStoreById);
//         handleCreateCoffeeStore(findCoffeeStoreById);
//       }
//     } else {
//       // SSG
//       handleCreateCoffeeStore(initialProps.coffeeStore);
//     }
//   }, [id, initialProps.coffeeStore, coffeeStores]);

//   const {
//     name = "",
//     address = "",
//     neighbourhood = "",
//     imgUrl = "",
//   } = coffeeStore;
//   const [votingCount, setVotingCount] = useState(0);

//   const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       setCoffeeStore(data[0]);
//       setVotingCount(data[0].voting);
//     }
//   }, [data]);

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   const handleUpvoteButton = async () => {
//     try {
//       const response = await fetch("/api/favouriteCoffeeStoreById", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//         }),
//       });

//       const dbCoffeeStore = await response.json();

//       if (dbCoffeeStore && dbCoffeeStore.length > 0) {
//         let count = votingCount + 1;
//         setVotingCount(count);
//       }
//     } catch (err) {
//       console.error("Error upvoting the coffee store", err);
//     }
//   };

//   if (error) {
//     return <div>Something went wrong retrieving coffee store page</div>;
//   }

//   return (
//     <div className={styles.layout}>
//       <Head>
//         <title>{name}</title>
//         <meta name="description" content={`${name} coffee store`} />
//       </Head>
//       <div className={styles.container}>
//         <div className={styles.col1}>
//           <div className={styles.backToHomeLink}>
//             <Link href="/">← Back to home</Link>
//           </div>
//           <div className={styles.nameWrapper}>
//             <h1 className={styles.name}>{name}</h1>
//           </div>
//           <Image
//             src={
//               imgUrl ||
//               "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
//             }
//             width={600}
//             height={360}
//             className={styles.storeImg}
//             alt={name}
//           />
//         </div>

//         <div className={cls("glass", styles.col2)}>
//           {address && (
//             <div className={styles.iconWrapper}>
//               <Image
//                 src="/static/icons/places.svg"
//                 width="24"
//                 height="24"
//                 alt="places icon"
//               />
//               <p className={styles.text}>{address}</p>
//             </div>
//           )}
//           {neighbourhood && (
//             <div className={styles.iconWrapper}>
//               <Image
//                 src="/static/icons/nearMe.svg"
//                 width="24"
//                 height="24"
//                 alt="near me icon"
//               />
//               <p className={styles.text}>{neighbourhood}</p>
//             </div>
//           )}
//           <div className={styles.iconWrapper}>
//             <Image
//               src="/static/icons/star.svg"
//               width="24"
//               height="24"
//               alt="star icon"
//             />
//             <p className={styles.text}>{votingCount}</p>
//           </div>

//           <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
//             Up vote!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoffeeStore;
