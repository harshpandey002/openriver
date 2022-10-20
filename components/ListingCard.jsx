/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaEthereum } from "react-icons/fa";
import styles from "@/styles/ListingCard.module.css";
import { formatAddress } from "@/helpers/utils";
import { ethers } from "ethers";

export default function ListingCard({ listing }) {
  const { asset, buyoutPrice, sellerAddress } = listing;

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={asset.image} alt={asset.name} />
      </div>
      <p id={styles.NFTName}>{asset.name}</p>
      <p id={styles.creator}>by {formatAddress(sellerAddress)}</p>
      <p>Current Price</p>
      <div className={styles.footer}>
        <div className={styles.price}>
          <FaEthereum />
          <p>{ethers.utils.formatEther(buyoutPrice._hex.toString())}</p>
        </div>
        <div id={styles.buy}>
          <button>Buy</button>
        </div>
      </div>
    </div>
  );
}
