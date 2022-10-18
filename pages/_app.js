import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
