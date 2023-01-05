import "../styles/globals.css";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import Head from "next/head";
import { OrderContextProvider } from "../store/order-context";

export default function App({ Component, pageProps }) {
  return (
    <OrderContextProvider>
      <Head>
        <title>Cinema Town</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </OrderContextProvider>
  );
}
