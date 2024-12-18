import "@styles/global.css";
import "@styles/variables.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }: AppProps) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
      }, []);
    
      if (!isClient) {
        return null;
      }
    return <Component {...pageProps} />;
};

export default appWithTranslation(App);
