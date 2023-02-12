import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const ShopGrid = styled(Grid)`
  .grid-shop-padding {
    padding-left: 16px;
    padding-right: 16px;
  }
  .grid-shop-phrase-margin {
    margin-top: 24px;
  }
  .grid-shop-search-margin {
    margin-bottom: 32px;
  }
  .grid-shop-banner-margin {
    margin-top: 56px;
  }
  .phrase1 {
    font-size: 26px;
    font-weight: 400;
  }
  .phrase2 {
    font-size: 26px;
    font-weight: 700;
  }
  .grid-shop-more {
    display: flex;
    p {
      color: #919191;
      font-size: 15px;
      line-height: 3;
      font-weight: 700;
      margin-right: 4px;
      margin-left: 16px;
    }
    svg {
      color: #919191;
      font-size: 1.2rem;
      margin-top: 12px;
    }
  }
`;

export const SearchBox = styled(Box)`
  position: relative;
  input {
    border: none;
    background-color: #f8f8f8;
    width: 95%;
    height: 56px;
    border-radius: 40px;
    padding-left: 4%;
    ::placeholder {
      color: #a7a7a7;
      font-size: 16px;
      font-weight: 400;
    }
    :focus {
      outline: none;
    }
  }
  .searchIcon {
    position: absolute;
    top: 29%;
    left: 92%;
  }
`;
