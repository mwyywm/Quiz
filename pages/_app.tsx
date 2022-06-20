import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/Layout";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <NextNProgress
          color="#F59E0B"
          startPosition={0.2}
          height={2}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
