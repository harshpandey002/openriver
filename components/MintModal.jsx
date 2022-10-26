/* eslint-disable @next/next/no-img-element */
import { useDataContext } from "@/context/dataContext";
import { formatAddress } from "@/helpers/utils";
import styles from "@/styles/MintModal.module.css";
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";

export default function MintModal({ show, onClose, collectionContract }) {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { createCollection, isCreating, setIsCreating, getNFTs } =
    useDataContext();

  const address = useAddress();

  const { contract: collection } = useContract(collectionContract);

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
    setImage("");
    onClose();
  };

  //! Minting New NFT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    const { name, description } = formData;
    const metadata = {
      name,
      description,
      image,
    };

    try {
      await collection.mintTo(address, metadata);
      handleClose();
      getNFTs();
    } catch (error) {
      console.log(error);
    }
    setIsCreating(false);
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
        {address ? (
          <>
            <div className={styles.header}>
              <span className={styles.title}>
                <p>Mint Token</p>
                {collectionContract ? (
                  <p>Collection {formatAddress(collectionContract)}</p>
                ) : (
                  <>
                    {isCreating ? (
                      <div className="loader2"></div>
                    ) : (
                      <button onClick={createCollection} id={styles.create}>
                        Create Collection
                      </button>
                    )}
                  </>
                )}
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
              {!collectionContract && (
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <BiHelpCircle
                    style={{
                      fontSize: 16,
                    }}
                  />
                  <p>
                    You need to create the collection first before minting any
                    token
                  </p>
                </div>
              )}
              <div
                style={{ marginTop: collectionContract ? "auto" : 0 }}
                className={styles.cta}
              >
                <button
                  onClick={handleClose}
                  disabled={isCreating}
                  type="button"
                >
                  Close
                </button>

                <button
                  disabled={isCreating || !collectionContract}
                  type="submit"
                >
                  {isCreating && collectionContract ? (
                    <Loader />
                  ) : (
                    <p>Mint NFT</p>
                  )}
                </button>
              </div>
            </form>
          </>
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

export function Loader() {
  return <div className="loader"></div>;
}
