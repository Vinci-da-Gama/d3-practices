import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * This is the MyDocument component.
 * Configure global style for styled-component.
 * Set head tag content here.
 */
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.log("32 -- error: ", error);
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en-AU">
        <Head>
          <link rel="manifest" href="/static/manifest.json" />

          <meta charSet="utf-8" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="ofx-exchange-rate-test" />
          <meta
            name="apple-mobile-web-app-title"
            content="ofx-exchange-rate-test"
          />
          <meta name="theme-color" content="#f79e37" />
          <meta name="msapplication-navbutton-color" content="#f79e37" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta
            name="description"
            content="Make fast and secure international money transfers with OFX (formerly OzForex). Register today and save with better exchange rates than the big banks."
          />
          <meta
            name="keywords"
            content="OFX, International Money Transfers, Currency Exchange, exchange rates"
          />

          <link
            rel="icon"
            href="/static/_imgs/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="shortcut icon"
            href="/static/_imgs/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/_imgs/icon_192x192.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192x192"
            href="/static/_imgs/icon_192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/static/_imgs/icon_512x512.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="512x512"
            href="/static/_imgs/icon_512x512.png"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
