import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import React, { FunctionComponent, useEffect, useState } from "react";
import "@cmStyles/index.scss";

import { worker } from "../mocks/browser";
import { server } from "../mocks/server";

if (process.env.NODE_ENV === "development") {
  worker.start();
} else if (process.env.NODE_ENV === "production") {
  server.listen();
}

const Camping: FunctionComponent<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  /*const [isShowComponent, setIsShowComponent] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      (async () => {
        const { server } = await import("../mocks/server");
        await server.listen();
        setIsShowComponent(true);
      })();
    } else {
      (async () => {
        const { worker } = await import("../mocks/browser");
        worker.start().then(() => {
          setIsShowComponent(true);
        });
      })();
    }
  });*/
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Camping</title>
      </Head>
      {/*{isShowComponent && <Component {...pageProps} />}*/}
      <Component {...pageProps} />
    </>
  );
};

Camping.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(Camping);
