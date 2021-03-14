import Link from "next/link";
import Head from "next/head";
// import Router from "next/router";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { GlobalStyle } from "./GlobalStyle";

/**
 * @param {react node} children -- component
 * @param {string} title -- page title
 * This is the layout component.
 */
const Layout = ({ children, title }) => {
  const router = useRouter();
  const linkUrls = ["/", "/Masterd3"];
  // console.log("18 -- router:", router);

  useEffect(() => {
    console.log("21 -- window.location: ", window.location);
    // return () => {}
  }, []);

  const handleActiveLink = (href) =>
    router.pathname === href || router.asPath === href ? "active-link" : "";

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
        {linkUrls.map((el, idx) => (
          <Link key={`${el}_${idx}`} href={el}>
            <a className={`${handleActiveLink(el)}`}>React_with_d3</a>
          </Link>
        ))}
      </header>
      <GlobalStyle />
      <div className="m-10">{children}</div>
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
