/* eslint-disable @next/next/no-img-element */
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import ListingCard from "@/components/ListingCard";
import ListModal from "@/components/ListModal";
import { useDataContext } from "@/context/dataContext";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const {
    listings,
    setListings,
    isLoading,
    showListModal,
    setShowListModal,
    nfts,
    setShowMintModal,
    getListings,
  } = useDataContext();

  return (
    <Layout>
      <ListModal
        show={showListModal}
        onClose={() => {
          setShowListModal(false);
        }}
        nfts={nfts}
        setShowMintModal={setShowMintModal}
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
