import React from "react";
import { FC } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

interface Props {
    children: React.ReactNode,
}

const Layout: FC<Props> = (props) => {
    return (
        <div>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout