/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Layout.module.css";
import Head from "next/head";
import Header from "./Header";

const Layout = ({ title, description, children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
      </Head>

      <div className={styles.container}>
        <Header />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "OpenRiver | Thirdweb Marketplace",
  description: "Create your collection, Mint NFT and list for sale.",
};

export default Layout;
