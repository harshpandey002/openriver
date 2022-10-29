import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import DataProvider from "@/context/dataContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
