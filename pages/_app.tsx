import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import "./index.css";
import Router from "next/router";
import { Loader } from "../components/Loader/Loader";
import { wrapper } from "../lib/store";
import { ThemeProvider } from "../ThemeContext/ThemeContext";
import { Provider } from "react-redux";

function MyApp({
  Component,
  pageProps,
}: Pick<AppProps, "Component" | "pageProps">) {
  const [loading, setLoading] = useState(false);
  const { store } = wrapper.useWrappedStore(pageProps);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          {loading ? (
            <Loader role="loaderInApp" />
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
