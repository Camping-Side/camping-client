import PropTypes from "prop-types";
import Head from "next/head";
import React, { FunctionComponent, useEffect, useState } from "react";
import "@cmStyles/index.scss";

import { persistor } from "../store/configureStore";
import { store, wrapper } from "../store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { server } from "../mocks/server";

server.listen();

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
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Head>
          <meta charSet="utf-8" />
          <title>Camping</title>
        </Head>
        {/*{isShowComponent && <Component {...pageProps} />}*/}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

Camping.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(Camping);
