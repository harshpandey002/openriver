export const MARKETPLACE_ADDRESS = "0x29563a327112f458b25Fb42A52cf081A0C0d51ba";

export const formatAddress = (address) => {
  return address.slice(0, 6) + "...." + address.slice(-4);
};
