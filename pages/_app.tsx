import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import React, { FunctionComponent, useEffect, useState } from "react";
import "@cmStyles/index.scss";

const Camping: FunctionComponent<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const [isShowComponent, setIsShowComponent] = useState(false);
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      const worker = import("./mocks/browser");
      worker.then((w) => w.worker.start());
      setTimeout(() => {
        setIsShowComponent(true);
      }, 500);
    } else {
      setIsShowComponent(true);
    }
  });
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Camping</title>
      </Head>
      {isShowComponent && <Component {...pageProps} />}
    </>
  );
};

Camping.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(Camping);
