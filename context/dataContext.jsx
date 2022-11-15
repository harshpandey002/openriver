/* eslint-disable react-hooks/exhaustive-deps */
import { MARKETPLACE_ADDRESS } from "@/helpers/utils";
import {
  useAddress,
  useContract,
  useNetwork,
  useNetworkMismatch,
  useSDK,
} from "@thirdweb-dev/react";
import { createContext, useContext, useEffect, useState } from "react";

export const dataContext = createContext();
export const useDataContext = () => useContext(dataContext);

function DataProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [showMintModal, setShowMintModal] = useState(false);
  const [collectionContract, setCollectionContract] = useState("");
  const [, switchNetwork] = useNetwork();
  const isMismatched = useNetworkMismatch();

  const address = useAddress();
  const sdk = useSDK();

  const { contract } = useContract(MARKETPLACE_ADDRESS);
  const { contract: collection } = useContract(collectionContract);

  useEffect(() => {
    if (!contract || isLoading) return;
    getListings();
  }, [contract]);

  useEffect(() => {
    if (!address) {
      setCollectionContract("");
      return;
    }
    getCollectionContract();
  }, [address]);

  useEffect(() => {
    if (!collection || !address) return;
    getNFTs();
  }, [address, collection]);

  //! Fetch all listings
  const getListings = async () => {
    setIsLoading(true);
    try {
      const list = await contract.getActiveListings();
      setListings(list);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //! Fetch NFTS for Creating Listing
  const getNFTs = async () => {
    try {
      const data = await collection.getAll();
      let Nfts = [];

      data.forEach((each) => {
        if (each.owner === address) {
          Nfts.push({
            label: each.metadata,
            value: {
              tokenId: each.metadata.id,
              tokenAddress: collectionContract,
            },
          });
        }
      });

      setNfts(Nfts);
    } catch (error) {
      console.log(error);
    }
  };

  //! Create a new collection on the behalf of user
  const createCollection = async () => {
    setIsCreating(true);
    try {
      const contractAddress = await sdk.deployer.deployNFTCollection({
        name: "OpenRiver",
        symbol: "RIVR",
        // this address comes from connected wallet address
        primary_sale_recipient: address,
      });

      setCollectionContract(contractAddress);
    } catch (error) {
      console.log(error);
    }
    setIsCreating(false);
  };

  //! Fetch Collection Contract to mint NFT
  const getCollectionContract = async () => {
    const url = `https://deep-index.moralis.io/api/v2/${address}/nft/collections?chain=mumbai`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key":
            "8SdNPyuDmzLJLVhYIWuchPbkjSQ9CWuBNxrA4ZWjyj6dozJKqWpEqM2uyCJJSTdt",
        },
      });

      const data = await res.json();
      let collectionAddr = "";
      data.result.forEach((each) => {
        if (each.symbol === "RIVR") {
          collectionAddr = each.token_address;
        }
      });
      setCollectionContract(collectionAddr);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    getListings,
    getNFTs,
    getCollectionContract,
    createCollection,
    listings,
    setListings,
    isLoading,
    setIsLoading,
    isCreating,
    setIsCreating,
    showListModal,
    setShowListModal,
    nfts,
    setNfts,
    showMintModal,
    setShowMintModal,
    collectionContract,
    setCollectionContract,
  };

  return (
    <dataContext.Provider value={contextValue}>{children}</dataContext.Provider>
  );
}

export default DataProvider;
