/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MARKETPLACE_ADDRESS } from "@/helpers/utils";
import styles from "@/styles/MintModal.module.css";
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { RadioButton } from "./RadioButton";

export default function ListModal({
  show,
  onClose,
  getListings,
  nfts,
  setShowMintModal,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    NFT: 0,
  });

  const address = useAddress();

  const { contract } = useContract(MARKETPLACE_ADDRESS);

  const handleClose = () => {
    setFormData({
      price: "",
      NFT: 0,
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const listing = {
      assetContractAddress: nfts[formData.NFT].value.tokenAddress,
      // token ID of the asset you want to list
      tokenId: nfts[formData.NFT].value.tokenId,
      // when should the listing open up for offers
      startTimestamp: new Date(),
      // how long the listing will be open for
      listingDurationInSeconds: 604800,
      // how many of the asset you want to list
      quantity: 1,
      // address of the currency contract that will be used to pay for the listing
      currencyContractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      // how much the asset will be sold for
      buyoutPricePerToken: formData.price,
    };

    try {
      await contract.direct.createListing(listing);
      getListings();
    } catch (error) {
      console.log(error);
    }
    handleClose();
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMint = () => {
    handleClose();
    setShowMintModal(true);
  };

  return (
    <>
      <div
        className={`overlay ${show ? "showOverlay" : ""}`}
        onClick={handleClose}
      />
      <div className={`${styles.modal}  ${show ? styles.showModal : ""}`}>
        {address ? (
          !nfts.length ? (
            <div className={styles.header}>
              <span className={styles.title}>
                <p>List For Sale</p>
                <p>
                  <span id={styles.headerLink} onClick={handleMint}>
                    Create collection and mint NFT first to
                  </span>
                  <br /> Create a listing
                </p>
              </span>

              <span onClick={handleClose} id={styles.close}>
                <AiOutlineClose />
              </span>
            </div>
          ) : (
            <>
              <div className={styles.header}>
                <span className={styles.title}>
                  <p>List For Sale</p>
                </span>

                <span onClick={handleClose} id={styles.close}>
                  <AiOutlineClose />
                </span>
              </div>
              <h3 id={styles.meta}>Settings</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.checks}>
                  {nfts.map((each, i) => (
                    <RadioButton
                      key={i + 1}
                      changed={handleChange}
                      id={i + 1}
                      isSelected={formData.NFT == i}
                      label={each.label}
                    />
                  ))}
                </div>
                <div className="input-group">
                  <label className="required" htmlFor="price">
                    Listing Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <p>The price of each token you are listing for sale.</p>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 4,
                  }}
                >
                  <BiHelpCircle
                    style={{
                      minWidth: 20,
                      minHeight: 20,
                    }}
                  />
                  <p>
                    2 Transaction will take place to List the NFT. Keep an eye
                    on the metamask extension icon if its not prompted
                    automatically.
                  </p>
                </div>
                <div className={styles.cta}>
                  <button
                    onClick={handleClose}
                    disabled={loading}
                    type="button"
                  >
                    Close
                  </button>

                  <button disabled={loading} type="submit">
                    {loading ? <Loader /> : <p>List For Sale</p>}
                  </button>
                </div>
              </form>
            </>
          )
        ) : (
          <div className={styles.header}>
            <ConnectWallet />

            <span onClick={handleClose} id={styles.close}>
              <AiOutlineClose />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

function Loader() {
  return <div className="loader"></div>;
}
