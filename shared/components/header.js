import Head from 'next/head'

export default function Header({title, description}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
        />
        <link
          rel="preload"
          as="font"
          crossOrigin="anonimous"
          href="/static/fonts/font.woff2"
        ></link>
        <link rel="shortcut icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link rel="manifest" href="site.webmanifest" />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="https://idena.io" />
        <meta
          property="og:image"
          content="https://idena.io/static/images/content.jpg"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IdenaNetwork" />
        <meta name="twitter:url" content="https://idena.io" />
        <meta name="twitter:creator" content="@IdenaNetwork" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://idena.io/static/images/content.jpg"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-139651161-1"
        ></script>
      </Head>
    </>
  )
}
