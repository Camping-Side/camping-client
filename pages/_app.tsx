import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import React, { FunctionComponent, useEffect, useState } from "react";
import "@cmStyles/index.scss";
const Camping: FunctionComponent<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const [isShowComponent, setIsShowComponent] = useState(true);
  useEffect(() => {
    /*if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      if (
        process.env.NODE_ENV === "test" ||
        process.env.NODE_ENV === "development"
      ) {
        const worker = import("./mocks/browser");
        worker.then((w) =>
          w.worker.start().then(() => {
            console.log("mock start dev");
            setIsShowComponent(true);
          })
        );
      } else if (process.env.NODE_ENV === "production") {
        const server = import("./mocks/server");
        console.log("mock start prod");
        server.then((w) => w.server.listen());
      }
    } else {
      setIsShowComponent(true);
    }*/
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
