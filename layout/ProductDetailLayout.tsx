import React, { FC } from "react";
import ProductHeader from "./Header/ProductHeader";
import Footer from "@layout/Footer/Footer";

interface Props {
  children: React.ReactNode;
  category?: string | string[] | undefined;
}

const ProductLayout: FC<Props> = (props: Props) => {
  return (
    <div className="layoutContainer layoutWidth">
      <ProductHeader category={props.category} />
      <main>{props.children}</main>
    </div>
  );
};

export default ProductLayout;
