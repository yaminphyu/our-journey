import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        <link rel="preload" as="image" href="/images/splash.png" />
        <link rel="preload" as="image" href="/images/gallery/first-1.jpg" />
        <link rel="preload" as="image" href="/images/gallery/first-2.jpg" />
        <link rel="preload" as="image" href="/images/gallery/first-3.jpg" />
        <link rel="preload" as="image" href="/images/gallery/first-4.jpg" />
        <link rel="preload" as="image" href="/images/gallery/second-1.jpg" />
        <link rel="preload" as="image" href="/images/gallery/second-2.jpg" />
        <link rel="preload" as="image" href="/images/gallery/second-3.jpg" />
        <link rel="preload" as="image" href="/images/gallery/second-4.jpg" />
        <link rel="preload" as="image" href="/images/gallery/third-1.jpg" />
        <link rel="preload" as="image" href="/images/gallery/third-2.jpg" />
        <link rel="preload" as="image" href="/images/gallery/third-3.jpg" />
        <link rel="preload" as="image" href="/images/gallery/third-4.jpg" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}