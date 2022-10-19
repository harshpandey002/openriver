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

  const { contract: collectionContract } = useContract(
    "0xb5018A3093B7d80cc12263C3e19Cd9fd70C57Ea2"
  );

  useEffect(() => {
    if (!contract) return;
    getListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  //! Create a new collection on the behalf of user
  const createCollection = async () => {
    try {
      const contractAddress = await sdk.deployer.deployNFTCollection({
        name: "New Collection",
        // this address comes from connected wallet address
        primary_sale_recipient: address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //! List any NFT from any collection to the marketplace
  const createDirectListing = async () => {
    const listing = {
      //TODO address of the contract the asset you want to list is on
      assetContractAddress: "0x...",
      // token ID of the asset you want to list
      tokenId: "0",
      // when should the listing open up for offers
      startTimestamp: new Date(),
      // how long the listing will be open for
      listingDurationInSeconds: 86400,
      // how many of the asset you want to list
      quantity: 1,
      // address of the currency contract that will be used to pay for the listing
      currencyContractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      // how much the asset will be sold for
      buyoutPricePerToken: "1.5",
    };

    const tx = await contract.direct.createListing(listing);
    const id = tx.id; // the id of the newly created listing
  };

  //! Mint new NFT to collection
  const mintNft = async () => {
    // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
    const metadata = {
      name: "Code pro",
      description: "Mint NFT by code",
      image:
        "https://img.seadn.io/files/60c04b8fdac7bc63599741fe54f81ae6.png?fit=max&w=2000", // This can be an image url or file
    };

    try {
      console.log(contract);
      const tx = await collectionContract.mintTo(address, metadata);
      const tokenId = tx.id; // the id of the NFT minted
      const nft = await tx.data(); // (optional) fetch details of minted NFT

      console.log(tx);
      console.log(nft);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    listings,
    createCollection,
    getListings,
    createDirectListing,
    mintNft,
  };
}
