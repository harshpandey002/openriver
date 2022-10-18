/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Home.module.css";
import {
  ConnectWallet,
  useAddress,
  useListings,
  useContract,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { formatAddress } from "../helpers/utils";
import { ethers } from "ethers";
import { FaEthereum } from "react-icons/fa";

export default function Home() {
  const [listings, setListings] = useState([]);
  const address = useAddress();

  const { contract } = useContract(
    "0x29563a327112f458b25Fb42A52cf081A0C0d51ba"
  );

  useEffect(() => {
    if (!contract) return;
    getListings();
  }, [contract]);

  const getListings = async () => {
    if (!!listings.length) return;
    const list = await contract.getAllListings();
    setListings(list);
  };

  console.log(listings);

  return (
    <div className={styles.container}>
      <ConnectWallet />
      <p>{address}</p>
      {/* <button onClick={createListings}>Create Listings</button> */}
      <div className="listings">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

function ListingCard({ listing }) {
  const { asset, buyoutPrice, sellerAddress } = listing;

  return (
    <div className="card">
      <img src={asset.image} alt="" />
      <p id="NFTName">{asset.name}</p>
      <p>by {formatAddress(sellerAddress)}</p>
      <p style={{ marginTop: 12 }}>Current Price</p>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <FaEthereum />
        <p>{ethers.utils.formatEther(buyoutPrice._hex.toString())}</p>
      </div>
    </div>
  );
}
