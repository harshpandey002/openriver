/* eslint-disable @next/next/no-img-element */
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import ListingCard from "@/components/ListingCard";
import styles from "@/styles/Home.module.css";
import { useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showListModal, setShowListModal] = useState(false);

  const { contract } = useContract(
    "0x29563a327112f458b25Fb42A52cf081A0C0d51ba"
  );

  useEffect(() => {
    if (!contract) return;
    getListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  const getListings = async () => {
    try {
      if (!!listings.length) throw "Restricting re-fetch";
      const list = await contract.getAllListings();
      setListings(list);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
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
          <button>List Your NFT</button>
        </div>
        <Listings listings={listings} isLoading={isLoading} />
      </div>
    </Layout>
  );
}

function Listings({ listings, isLoading }) {
  return (
    <div className={styles.listings}>
      {isLoading ? (
        <div className="dot-pulse"></div>
      ) : !!listings.length ? (
        <>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </>
      ) : (
        <p>No Item Listed</p>
      )}
    </div>
  );
}
