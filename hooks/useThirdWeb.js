/* eslint-disable @next/next/no-img-element */
import { useAddress, useContract, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export default function useThirdWeb() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const address = useAddress();
  const sdk = useSDK();
  const { contract } = useContract(
    "0x29563a327112f458b25Fb42A52cf081A0C0d51ba"
  );

  useEffect(() => {
    if (!contract) return;
    getListings();
  }, [contract]);

  const getListings = async () => {
    try {
      if (!!listings.length) throw "Restricting re-fetch";
      const list = await contract.getAllListings();
      setListings(list);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const createCollection = async () => {
    try {
      const contractAddress = await sdk.deployer.deployNFTCollection({
        name: "New Collection",
        primary_sale_recipient: address,
      });

      console.log(contractAddress);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    listings,
    createCollection,
    getListings,
  };
}
