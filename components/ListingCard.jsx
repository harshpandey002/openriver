/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import styles from "@/styles/ListingCard.module.css";
import { formatAddress, MARKETPLACE_ADDRESS } from "@/helpers/utils";
import { ethers } from "ethers";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { Loader } from "./MintModal";

export default function ListingCard({ listing, dList }) {
  const { asset, buyoutPrice, sellerAddress, id } = listing;
  const { contract } = useContract(MARKETPLACE_ADDRESS);
  const [loading, setLoading] = useState();

  const address = useAddress();

  const handleDlist = async () => {
    setLoading(true);
    try {
      await contract.direct.cancelListing(id);
      dList(id);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
        {loading ? (
          <div id={styles.buy}>
            <div className="loader2"></div>
          </div>
        ) : (
          <div id={styles.buy}>
            {address === sellerAddress && (
              <button
                disabled={loading}
                onClick={handleDlist}
                id={styles.dlist}
              >
                De-List
              </button>
            )}
            <button disabled={loading}>Buy</button>
          </div>
        )}
      </div>
    </div>
  );
}
