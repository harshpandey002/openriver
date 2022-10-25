/* eslint-disable @next/next/no-img-element */
import { useDataContext } from "@/context/dataContext";
import styles from "@/styles/Layout.module.css";
import { useAddress } from "@thirdweb-dev/react";
import Head from "next/head";
import Header from "./Header";
import MintModal from "./MintModal";

const Layout = ({ title, description, children }) => {
  const {
    showMintModal,
    setShowMintModal,
    collectionContract,
    setCollectionContract,
  } = useDataContext();

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
