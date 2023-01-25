import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomLink from "@cp/common/CustomLink";

export const Category = (props: any) => {
  return (
    <>
      {props.categoryList.map((category: any, index: number) => {
        return (
          <Grid item xs={2.4} key={index}>
            <CustomLink
              href={{
                pathname: "/shop/product",
                query: { category: category.name },
              }}
            >
              <img src={category.img} />
              <br />
              <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
                {category.name}
              </Typography>
            </CustomLink>
          </Grid>
        );
      })}
    </>
  );
};
