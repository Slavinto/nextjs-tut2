import Link from "next/link";
import Image from "next/image";
// import "./banner.module.scss";

import React from "react";

const Banner = ({ ctaText, handleClickCta }) => {
    return (
        <section className='banner'>
            <article className='banner__description'>
                <h1 className='banner__title'>
                    <span className='banner__text-light'>Coffee</span>{" "}
                    <span className='banner__text-dark'>Connoisseur</span>
                </h1>
                <p className='banner__text'>
                    Discover your local coffee shops!
                </p>
                <Link
                    onClick={() => handleClickCta()}
                    className='banner__cta'
                    href='#'
                >
                    {ctaText}
                </Link>
            </article>
            <figure className='banner__hero-image-container'>
                <Image
                    className='banner__hero-image'
                    src='/../public/static/heroimg.png'
                    width={407}
                    height={240}
                    alt='women drinking coffee illustration'
                />
            </figure>
        </section>
    );
};

export default Banner;

// const Banner = (props) => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>
//         <span className={styles.title1}>Coffee</span>
//         <span className={styles.title2}>Connoisseur</span>
//       </h1>
//       <p className={styles.subTitle}>Discover your local coffee stores!</p>
//       <div className={styles.buttonWrapper}>
//         <button className={styles.button} onClick={props.handleOnClick}>
//           {props.buttonText}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner;
