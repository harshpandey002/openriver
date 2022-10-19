/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.left}>
          <h1>
            Sell, buy, discover <br /> and collect NFT arts.
          </h1>
        </div>
        <div className={styles.right}>
          <p>
            Modern NFT Marketplace using Thirdweb. <br /> Artists can poll for
            features using DAO. <br /> Create your collection, Mint NFT and list
            for sale.
          </p>
        </div>
      </div>
      <div className={styles.gradient}>
        <img id={styles.astroRight} src="../astroRight.png" alt="astronaut" />
        <img id={styles.astroLeft} src="../astroLeft.png" alt="astronaut" />
      </div>
    </div>
  );
}
