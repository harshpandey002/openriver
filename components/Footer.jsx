/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Footer.module.css";
import { AiFillInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
export default function Footer() {
  const open = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.container}>
      <p className={styles.credit}>
        Designed by{" "}
        <a
          href="https://dribbble.com/shots/19328654-NFT-Marketplace-Website"
          target="_blank"
          rel="noreferrer"
        >
          Emon Pixel
        </a>{" "}
      </p>
      <div className={styles.socials}>
        <span>
          <FaLinkedinIn
            className={styles.icon}
            onClick={() =>
              open("https://www.linkedin.com/in/harsh-kumar-pandey-5ab9071aa/")
            }
          />
          <AiFillGithub
            className={styles.icon}
            onClick={() => open("https://github.com/harshpandey002/openriver")}
          />
          <FaTwitter
            className={styles.icon}
            onClick={() => open("https://twitter.com/harshpandey_002")}
          />
          <AiFillInstagram
            className={styles.icon}
            onClick={() => open("https://www.instagram.com/harshpandey_002/")}
          />
        </span>
        <a
          href="https://www.harshkumarpandey.com"
          target="_blank"
          rel="noreferrer"
        >
          harshkumarpandey.com
        </a>
      </div>
      <div className={styles.logo}>
        <img src="https://i.imgur.com/UhzOw1n.png" alt="logo" />
        <h2>OpenRiver</h2>
      </div>
    </div>
  );
}
