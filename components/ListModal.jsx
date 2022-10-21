/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/MintModal.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";

export default function ListModal({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    price: "",
  });

  const address = useAddress();

  const { contract } = useContract(
    "0x29563a327112f458b25Fb42A52cf081A0C0d51ba"
  );

  const handleClose = () => {
    setFormData({
      price: "",
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div
        className={`overlay ${show ? "showOverlay" : ""}`}
        onClick={handleClose}
      />
      <div className={`${styles.modal}  ${show ? styles.showModal : ""}`}>
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
            <input
              checked
              type="radio"
              id="myCheckbox1"
              name="myradio"
              hidden
            />
            <label htmlFor="myCheckbox1">
              <img src="https://gateway.ipfscdn.io/ipfs/QmagA9DymDYWpYZR9AmbFsnpv7MDXJRgm3Y6KSwspozW2L/3d%20peep.png" />
            </label>
            <input type="radio" id="myCheckbox2" name="myradio" hidden />
            <label htmlFor="myCheckbox2">
              <img src="https://img.seadn.io/files/60c04b8fdac7bc63599741fe54f81ae6.png?fit=max&w=2000" />
            </label>
            <input type="radio" id="myCheckbox3" name="myradio" hidden />
            <label htmlFor="myCheckbox3">
              <img src="https://i.seadn.io/gae/GF-RZP-1uOyITE_OL6hLDjAHH1jetPDhxbgGwDF6zJeaYmsly5ff2zOU9W5xZdEY1IdE2Ku6YrBI5dVgoH5arQEziGVuKlosx4U4Dic?auto=format&w=1000" />
            </label>
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

          <div className={styles.cta}>
            <button onClick={handleClose} disabled={loading} type="button">
              Close
            </button>

            <button disabled={loading} type="submit">
              {loading ? <Loader /> : <p>List For Sale</p>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function Loader() {
  return <div class="loader"></div>;
}
