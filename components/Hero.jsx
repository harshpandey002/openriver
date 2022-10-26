/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Hero.module.css";
import { useDataContext } from "@/context/dataContext";

export default function Hero() {
  const {
    collectionContract,
    setShowMintModal,
    createCollection,
    setShowListModal,
    isCreating,
    nfts,
  } = useDataContext();

  const mintNft = () => {
    setShowMintModal(true);
  };

  const listNft = () => {
    setShowListModal(true);
  };

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

        {collectionContract ? (
          <div className={styles.cta}>
            <div onClick={mintNft} className={styles.buttonCard}>
              <h4>Mint NFT</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis, unde?
              </p>
            </div>
            <div className={styles.dashed} />
            <div
              onClick={listNft}
              className={`${styles.buttonCard} ${
                !!nfts.length ? "" : styles.hollow
              }`}
            >
              <h4>List For Sale</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis, unde?
              </p>
            </div>
          </div>
        ) : (
          <>
            <p>
              You need to complete <strong>Creating Collection</strong> and{" "}
              <strong>Mint NFT</strong> in one go for the first time.
            </p>
            <div className={styles.cta}>
              <div onClick={createCollection} className={styles.buttonCard}>
                <h4>Create Collection</h4>
                {isCreating && (
                  <span>
                    <div className="loader2"></div>
                  </span>
                )}

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, unde?
                </p>
              </div>
              <div className={styles.dashed} />
              <div className={`${styles.buttonCard} ${styles.hollow}`}>
                <h4>Mint NFT</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, unde?
                </p>
              </div>
              <div className={styles.dashed} />
              <div className={`${styles.buttonCard} ${styles.hollow}`}>
                <h4>List For Sale</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, unde?
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
