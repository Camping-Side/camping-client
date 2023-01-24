import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export const Category = (props: any) => {
  return (
    <>
      {props.categoryList.map((category: any) => {
        return (
          <Grid item xs={2.4}>
            <Link
              href={{
                pathname: "/shop/product",
                query: { category: category.name },
              }}
              passHref
            >
              <a>
                <img src={category.img} />
                <br />
                <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
                  {category.name}
                </Typography>
              </a>
            </Link>
          </Grid>
        );
      })}
    </>
  );
};
