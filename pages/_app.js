import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Mumbai}
      chainRpc={{
        1: "https://eth-goerli.g.alchemy.com/v2/FgxSyMJsZWzvbK0tnARxzOiHsEiq4V5x",
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
