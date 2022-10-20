/* eslint-disable @next/next/no-img-element */
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import ListingCard from "@/components/ListingCard";
import styles from "@/styles/Home.module.css";
import { useAddress } from "@thirdweb-dev/react";
import useThirdWeb from "../hooks/useThirdWeb";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Hero />
        <div className={styles.heading}>
          <h2>
            Tranding NFTs <br />
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
        <Listings />
      </div>
    </Layout>
  );
}

function Listings() {
  const { listings, isLoading } = useThirdWeb();

  return (
    <div className={styles.listings}>
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
  );
}
