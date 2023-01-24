import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

const TabsStyle = styled(Tabs)`
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} mb={5}>
        <TabsStyle
          value={selectedCategoryIndex}
          onChange={handleSelectedCategory}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categoryList.map((category: any, index: number) => {
            return <Tab key={index} label={category} />;
          })}
        </TabsStyle>
      </Box>
    </Box>
  );
};
