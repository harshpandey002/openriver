/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Layout.module.css";
import { useAddress } from "@thirdweb-dev/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "./Header";
import MintModal from "./MintModal";

const Layout = ({ title, description, children }) => {
  const [showMintModal, setShowMintModal] = useState(false);
  const [collectionContract, setCollectionContract] = useState("");

  const address = useAddress();
  useEffect(() => {
    if (!address) return;
    getCollectionContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  //! Fetch Collection Contract to mint NFT
  const getCollectionContract = async () => {
    const url = `https://deep-index.moralis.io/api/v2/${address}/nft/collections?chain=mumbai`;

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
      let collectionAddr = "";
      console.log(data);
      data.result.forEach((each) => {
        if (each.symbol === "RIVR") {
          collectionAddr = each.token_address;
        }
      });
      console.log(collectionAddr);
      setCollectionContract(collectionAddr);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
      </Head>

      <div className={styles.container}>
        <Header setShowMintModal={setShowMintModal} />
        <div className={styles.children}>{children}</div>
      </div>
      <MintModal
        show={showMintModal}
        onClose={() => {
          setShowMintModal(false);
        }}
        collectionContract={collectionContract}
        setCollectionContract={setCollectionContract}
      />
    </div>
  );
};

Layout.defaultProps = {
  title: "OpenRiver | Thirdweb Marketplace",
  description: "Create your collection, Mint NFT and list for sale.",
};

export default Layout;
