import React from "react";
import { FC } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styled from '@emotion/styled';

interface Props {
    children: React.ReactNode,
}

const MainWidth = styled.div`
    width: 30%;
    margin: 0 auto;
`

const Layout: FC<Props> = (props) => {


    return (
        <MainWidth>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </MainWidth>
    )
}

export default Layout