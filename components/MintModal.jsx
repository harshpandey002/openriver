import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/MintModal.module.css";
import ReactDOM from "react-dom";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";

export default function MintModal({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onDrop = useCallback((acceptedFiles) => {
    handleDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const imageUri = reader.result;
      console.log(imageUri);
    };
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="input-group">
            <label htmlFor="token">Name</label>
            <input id="token" type="text" />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea rows={3} id="description" />
          </div>
          <div className={styles.imageSection}>
            <div
              style={{ borderColor: isDragAccept ? "#134cae" : "" }}
              className={styles.dropzone}
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              <AiOutlineCloudUpload id={styles.uploadIcon} />
              <p>Upload Image</p>
            </div>
            <button onClick={open}>Select File</button>
          </div>
          <div className={styles.cta}>
            <button>Close</button>
            <button type="submit">Mint NFT</button>
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
