import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import React, {FunctionComponent} from "react";

// 전체 페이지에 공통적인 적용함
const Camping: FunctionComponent<{Component: any}> = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>Camping</title>
            </Head>
            <Component/>
        </>
    );
};

Camping.propTypes = {
    Component: PropTypes.elementType.isRequired,
}
export default wrapper.withRedux(Camping);