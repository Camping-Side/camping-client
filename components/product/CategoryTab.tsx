import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

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

export const CategoryTab = (props: any) => {
  const categoryList = props.categoryList;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const handleSelectedCategory = (
    event: React.SyntheticEvent,
    categoryIndex: number
  ) => {
    props.setSelectedCategory(categoryList[categoryIndex]);
    setSelectedCategoryIndex(categoryIndex);
  };

  return (
    <CategoryTabBox>
      <Box className={"div-tab"}>
        <Tabs
          value={selectedCategoryIndex}
          onChange={handleSelectedCategory}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categoryList.map((category: any, index: number) => {
            return <Tab key={index} label={category} />;
          })}
        </Tabs>
      </Box>
    </CategoryTabBox>
  );
};
