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
  const linkUrls = [
    {
      url: "/",
      label: "React_with_d3",
    },
    {
      url: "/Masterd3",
      label: "Master_d3",
    },
  ];

  useEffect(() => {
    console.log("29 -- window.location: ", window.location);
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
          <Link key={`${el.label}_${idx}`} href={el.url}>
            <a className={`${handleActiveLink(el.url)}`}>{el.label}</a>
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
