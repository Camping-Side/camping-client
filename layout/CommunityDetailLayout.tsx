import React, { FC } from "react";
import CommunityHeader from "./Header/CommunityHeader";

interface Props {
  children: React.ReactNode;
  category?: string | string[] | undefined;
}

const ProductLayout: FC<Props> = (props: Props) => {
  return (
    <div className="layoutContainer layoutWidth">
      <CommunityHeader />
      <main>{props.children}</main>
    </div>
  );
};

export default ProductLayout;
