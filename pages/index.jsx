/* eslint-disable @next/next/no-img-element */
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import ListingCard from "@/components/ListingCard";
import ListModal from "@/components/ListModal";
import styles from "@/styles/Home.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MARKETPLACE_ADDRESS } from "@/helpers/utils";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [nfts, setNfts] = useState([]);

  const address = useAddress();

  const { contract } = useContract(MARKETPLACE_ADDRESS);

  useEffect(() => {
    if (!contract || isLoading) return;
    getListings();
    if (!address) return;
    getNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, address]);

  //! Fetch all listings
  const getListings = async () => {
    setIsLoading(true);
    try {
      const list = await contract.getAllListings();
      setListings(list);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //! Fetch NFTS for Creating Listing
  const getNFTs = async () => {
    const url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=mumbai&format=decimal`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key":
            "8SdNPyuDmzLJLVhYIWuchPbkjSQ9CWuBNxrA4ZWjyj6dozJKqWpEqM2uyCJJSTdt",
        },
      });

      const data = await res.json();

      let nfts = [];

      data.result.forEach((each) => {
        if (!!each.metadata) {
          nfts.push({
            // label: JSON.parse(each.metadata).image,
            label: JSON.parse(each.metadata),
            value: {
              tokenId: each.token_id,
              tokenAddress: each.token_address,
            },
          });
        }
      });
      setNfts(nfts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <ListModal
        show={showListModal}
        onClose={() => {
          setShowListModal(false);
        }}
        nfts={nfts}
        getListings={getListings}
      />
      <div className={styles.container}>
        <Hero />
        <div className={styles.heading}>
          <h2>
            Trending NFTs <br />
            Just For You
          </h2>
          <p>
            Collection of unexplainable arts from amazing <br /> artists all
            around the world.
          </p>
        </div>
        <div className={styles.listingHeader}>
          <h3>Discover</h3>
          <button onClick={() => setShowListModal(true)}>List Your NFT</button>
        </div>
        <Listings
          listings={listings}
          setListings={setListings}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
}

function Listings({ listings, setListings, isLoading }) {
  const dList = (id) => {
    let newList = JSON.parse(JSON.stringify(listings));
    newList = newList.filter((each) => each.id != id);
    setListings(newList);
  };

  return (
    <div className={styles.listings}>
      {isLoading ? (
        <div className="dot-pulse"></div>
      ) : !!listings.length ? (
        <>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} dList={dList} />
          ))}
        </>
      ) : (
        <p>No Item Listed</p>
      )}
    </div>
  );
}
