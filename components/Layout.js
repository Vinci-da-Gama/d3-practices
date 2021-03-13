import Link from "next/link";
import Head from "next/head";
// import Router from "next/router";
import PropTypes from "prop-types";

import { GlobalStyle } from "./GlobalStyle";

/**
 * @param {react node} children -- component
 * @param {string} title -- page title
 * This is the layout component.
 */
const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=2.0"
        />
      </Head>
      <header>
        <Link href="/">
          <a>React_with_d3</a>
        </Link>
        <Link href="/Masterd3">
          <a>Master_d3</a>
        </Link>
      </header>
      <GlobalStyle />
      <div>{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
