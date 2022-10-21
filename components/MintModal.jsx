/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/MintModal.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";

export default function MintModal({ show, onClose }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const address = useAddress();

  const { contract: collection } = useContract(
    "0xC4A0468Cd9c06D1D398E27d7C84758d75564f107"
  );

  const onDrop = useCallback((acceptedFiles) => {
    handleDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, description } = formData;
    const metadata = {
      name,
      description,
      image,
    };

    try {
      await collection.mintTo(address, metadata);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const imageUri = reader.result;
      setImage(imageUri);
    };
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
            <p>Mint Token</p>
            <p>Contract 0x4C4c...43d9</p>
          </span>

          <span onClick={handleClose} id={styles.close}>
            <AiOutlineClose />
          </span>
        </div>
        <h3 id={styles.meta}>Metadata</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="input-group">
            <label className="required" htmlFor="token">
              Name
            </label>
            <input
              id="token"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              rows={3}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="image">Media</label>
            <div className={styles.imageSection}>
              <div
                style={{
                  borderColor: isDragAccept ? "#134cae" : "",
                  borderWidth: image ? 0 : 1,
                }}
                className={styles.dropzone}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {image ? (
                  <img src={image} alt="NFT Image" />
                ) : (
                  <>
                    <AiOutlineCloudUpload id={styles.uploadIcon} />
                    <p>Upload Image</p>
                  </>
                )}
              </div>
              <button onClick={open}>Select File</button>
            </div>
          </div>
          <div className={styles.cta}>
            <button onClick={handleClose} disabled={loading} type="button">
              Close
            </button>

            <button disabled={loading} type="submit">
              {loading ? <Loader /> : <p>Mint NFT</p>}
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
