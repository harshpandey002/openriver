import { useEffect, useState } from "react";
import styles from "@/styles/MintModal.module.css";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

export default function MintModal({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    onClose();
  };

  const modalContent = show ? (
    <>
      <div className="overlay" onClick={handleClose} />

      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.title}>
            <p>Mint Token</p>
            <p>Contract 0x4C4c...43d9</p>
          </span>

          <span id={styles.close}>
            <AiOutlineClose />
          </span>
        </div>
        <h3 id={styles.meta}>Metadata</h3>
        <form className={styles.form}>
          <div className="input-group">
            <label htmlFor="token">Name</label>
            <input id="token" type="text" />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea rows={5} id="description" />
          </div>
          <div className={styles.cta}>
            <button>Close</button>
            <button>Mint NFT</button>
          </div>
        </form>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
