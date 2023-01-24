import React, { FC } from "react";
import ProductHeader from "./Header/ProductHeader";
import Footer from "./Footer/Footer";

interface Props {
  children: React.ReactNode;
  category: string | string[] | undefined;
}

const ProductLayout: FC<Props> = (props) => {
  return (
    <div className="layoutContainer layoutWidth">
      <ProductHeader category={props.category} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default ProductLayout;
