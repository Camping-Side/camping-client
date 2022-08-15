import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import React, {FunctionComponent, useEffect} from "react";

// 전체 페이지에 공통적인 적용함
const Camping: FunctionComponent<{Component: any}> = ({ Component }) => {

    //https://velog.io/@eunddodi/React-모바일-웹-앱-100vh-실제-화면-크기로-맞추기--------
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    useEffect(() => {
        setScreenSize();
    });
    //https://velog.io/@eunddodi/React-모바일-웹-앱-100vh-실제-화면-크기로-맞추기-------

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