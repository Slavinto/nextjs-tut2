import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ coffeeStore }) => {
    return (
        <Link className='stores__card-link' href={coffeeStore.href}>
            <figure className='stores__card'>
                <h3 className='stores__card-title'>{coffeeStore.name}</h3>
                <div className='stores__image-container'>
                    <Image
                        className='stores__image'
                        src={
                            coffeeStore.imgUrl ||
                            "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                        }
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
