import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <body className="bg-darkbg font-sans text-white">
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
}
