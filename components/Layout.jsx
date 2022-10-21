/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Layout.module.css";
import Head from "next/head";
import { useState } from "react";
import Header from "./Header";
import MintModal from "./MintModal";

const Layout = ({ title, description, children }) => {
  const [showMintModal, setShowMintModal] = useState(false);

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
      />
    </div>
  );
};

Layout.defaultProps = {
  title: "OpenRiver | Thirdweb Marketplace",
  description: "Create your collection, Mint NFT and list for sale.",
};

export default Layout;
