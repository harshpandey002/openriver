/* eslint-disable @next/next/no-img-element */
import { formatAddress, MARKETPLACE_ADDRESS } from "@/helpers/utils";
import styles from "@/styles/ListingCard.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ListingCard({ listing, dList }) {
  const { asset, buyoutPrice, sellerAddress, id, secondsUntilEnd } = listing;
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

  const buyListing = async () => {
    setLoading(true);
    try {
      await contract.buyoutListing(id, 1);
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
    setLoading(false);
  };

  const byAddress = sellerAddress === address;

  const showBuy =
    parseInt(secondsUntilEnd._hex.toString(), 16) >
    Math.floor(new Date().getTime() / 1000);

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
            {address &&
              !byAddress &&
              (showBuy ? (
                <button onClick={buyListing} disabled={loading}>
                  Buy
                </button>
              ) : (
                <p className={styles.expire}>Expired</p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
