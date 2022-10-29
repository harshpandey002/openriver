/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Hero.module.css";
import { useDataContext } from "@/context/dataContext";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function Hero() {
  const {
    collectionContract,
    setShowMintModal,
    createCollection,
    setShowListModal,
    isCreating,
    nfts,
  } = useDataContext();

  const address = useAddress();

  const mintNft = () => {
    setShowMintModal(true);
  };

  const listNft = () => {
    setShowListModal(true);
  };

  const mintText = "Create your art and mint 'images' or 'gif' as NFT.";
  const collectionText =
    "Create OpenRiver collection on mumbai testnet. A place to Store minted NFTs.";
  const listText =
    "Once NFT is minted, list them on this marketplace for others to buy.";

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
            Modern Thirdweb NFT Marketplace. <br />
            Create your collection, Build amazing art, <br /> Mint as NFT and
            list for sale.
          </p>
        </div>
        <div className={styles.wallet}>
          <ConnectWallet />
        </div>
      </div>
      <div className={styles.gradient}>
        <img id={styles.astroRight} src="../astroRight.png" alt="astronaut" />
        <img id={styles.astroLeft} src="../astroLeft.png" alt="astronaut" />

        {collectionContract ? (
          <div className={styles.cta}>
            <div onClick={mintNft} className={styles.buttonCard}>
              <h4>Mint NFT</h4>
              <p>{mintText}</p>
            </div>
            <div className={styles.dashed} />
            <div
              onClick={listNft}
              className={`${styles.buttonCard} ${
                !!nfts.length ? "" : styles.hollow
              }`}
            >
              <h4>List For Sale</h4>
              <p>{listText}</p>
            </div>
          </div>
        ) : (
          <>
            {address ? (
              <p>
                You need to complete <strong>Creating Collection</strong> and{" "}
                <strong>Mint NFT</strong> in one go for the first time.
              </p>
            ) : (
              <p>
                You need to <strong>Connect your wallet</strong> in order to
                interact with the marketplace.
              </p>
            )}
            <div className={styles.cta}>
              <div
                onClick={createCollection}
                className={`${styles.buttonCard} ${
                  address ? "" : styles.hollow
                }`}
              >
                <h4>Create Collection</h4>
                {isCreating && (
                  <span>
                    <div className="loader2"></div>
                  </span>
                )}

                <p>{collectionText}</p>
              </div>
              <div className={styles.dashed} />
              <div className={`${styles.buttonCard} ${styles.hollow}`}>
                <h4>Mint NFT</h4>
                <p>{mintText}</p>
              </div>
              <div className={styles.dashed} />
              <div className={`${styles.buttonCard} ${styles.hollow}`}>
                <h4>List For Sale</h4>
                <p>{listText}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
