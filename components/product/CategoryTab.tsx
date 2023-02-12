import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import { Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { Category, Product, ProductReqData } from "../../type/product/product";
import productSlice from "@reducers/product";
import { getList } from "../../actions/product";

const CategoryTabBox = styled(Box)`
  width: 100%;
  .div-tab {
    margin-bottom: 40px;
    border-bottom: 1px solid;
    border-color: rgba(0, 0, 0, 0.12);
  }
  .Mui-selected {
    color: #5bbd07 !important;
  }
  .MuiTabs-indicator {
    background-color: #5bbd07 !important;
  }
  button {
    font-size: 20px;
    font-weight: 400;
    color: #919191;
  }
`;

type Props = {
  categoryList: Category[];
  productReqData: ProductReqData;
};

export const CategoryTab = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const categoryList = props.categoryList;

  const selectedCategory: Category = useSelector(
    (state: any) => state.product.selectedCategory
  );

  const handleSelectedCategory = (
    event: React.SyntheticEvent,
    categoryIndex: number
  ) => {
    dispatch(
      productSlice.actions.setSelectedCategory(categoryList[categoryIndex])
    );
    props.productReqData.isList = true;
    props.productReqData.category = categoryList[categoryIndex].id;
    dispatch(getList(props.productReqData));
  };

  return (
    <CategoryTabBox>
      <Box className={"div-tab"}>
        <Tabs
          value={selectedCategory.id - 1}
          onChange={handleSelectedCategory}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categoryList.map((category: any) => {
            return <Tab key={category.id} label={category.name} />;
          })}
        </Tabs>
      </Box>
    </CategoryTabBox>
  );
};
