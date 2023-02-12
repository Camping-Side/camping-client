import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomLink from "@cp/common/CustomLink";
import styled from "@emotion/styled";

const CategoryGrid = styled(Grid)`
  text-align: center;
  p {
    font-size: 20px;
    font-weight: 400;
  }
`;

export const CategoryComponent = (props: any) => {
  console.log(props);
  return (
    <>
      {props.categoryList.map((category: any, index: number) => {
        return (
          <CategoryGrid item xs={2.4} key={index}>
            <CustomLink
              href={{
                pathname: "/shop/product",
                query: { category: category.name },
              }}
            >
              <img src={category.img} />
              <br />
              <Typography>{category.name}</Typography>
            </CustomLink>
          </CategoryGrid>
        );
      })}
    </>
  );
};
