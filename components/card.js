import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ coffeeStore }) => {
    return (
        <Link className='stores__card-link' href={coffeeStore.href}>
            <figure className='stores__card'>
                {coffeeStore.name && (
                    <h3 className='stores__card-title'>{coffeeStore.name}</h3>
                )}
                {coffeeStore.address && (
                    <p className='stores__card-address'>
                        {coffeeStore.address}
                    </p>
                )}
                <div className='stores__image-container'>
                    <Image
                        className='stores__image'
                        src={coffeeStore.imgUrl}
                        alt='coffee store cafe people drinking coffee'
                        width={150}
                        height={100}
                    />
                </div>
            </figure>
            <div className='stores__card-overlay'></div>
        </Link>
    );
};

export default Card;

// import Link from "next/link";
// import Image from "next/image";
// import cls from "classnames";

// import styles from "./card.module.css";

// const Card = (props) => {
//   return (
//     <Link href={props.href} className={styles.cardLink}>
//       <div className={cls("glass", styles.container)}>
//         <div className={styles.cardHeaderWrapper}>
//           <h2 className={styles.cardHeader}>{props.name}</h2>
//         </div>
//         <div className={styles.cardImageWrapper}>
//           <Image
//             className={styles.cardImage}
//             src={props.imgUrl}
//             width={260}
//             height={160}
//             alt={props.name}
//           />
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Card;
