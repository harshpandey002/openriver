/* eslint-disable @next/next/no-img-element */
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useRef, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { formatAddress } from "../helpers/utils";
import useThirdWeb from "../hooks/useThirdWeb";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { listings, isLoading } = useThirdWeb();
  const address = useAddress();

  return (
    <Layout>
      <div className={styles.container}>
        <Hero />
        <div className="listings">
          {isLoading ? (
            <div className="dot-pulse"></div>
          ) : !!listings.length ? (
            <>
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </>
          ) : (
            <p>No Item Listed</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

function ListingCard({ listing }) {
  const { asset, buyoutPrice, sellerAddress } = listing;

  return (
    <div className="card">
      <img src={asset.image} alt="" />
      <p id="NFTName">{asset.name}</p>
      <p style={{ marginTop: 2 }}>by {formatAddress(sellerAddress)}</p>
      <p style={{ marginTop: 12 }}>Current Price</p>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <FaEthereum />
        <p>{ethers.utils.formatEther(buyoutPrice._hex.toString())}</p>
      </div>
    </div>
  );
}
