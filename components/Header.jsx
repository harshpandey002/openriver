/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Header.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Header({ setShowMintModal }) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="https://i.imgur.com/UhzOw1n.png" alt="logo" />
        <h2>OpenRiver</h2>
      </div>
      <ul className={styles.links}>
        {/* <li>Poll</li> */}
        <li onClick={() => setShowMintModal(true)}>Mint NFT</li>
        <li>
          <ConnectWallet />
        </li>
      </ul>
    </div>
  );
}
