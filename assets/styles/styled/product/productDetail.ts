import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const InfoGrid = styled(Grid)`
  .sub-image-grid {
    margin-top: 15px;
  }
`;

export const TitleGrid = styled(Grid)`
  margin-top: 5px;
  padding: 20px;
  .grid-icon {
    text-align: center;
    cursor: pointer;
    line-height: 44px;
  }
  .brand {
    font-weight: 700;
    font-size: 16px;
    color: #919191;
  }
  .name {
    margin-top: 5px;
    margin-bottom: 15px;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: #222222;
  }
  .dc-rate {
    font-weight: 700;
    font-size: 26px;
    color: #fc6e51;
    margin-right: 16px;
  }
  .price {
    font-weight: 700;
    font-size: 26px;
    color: #222222;
    margin-right: 8px;
  }
  .origin-price {
    font-weight: 400;
    font-size: 20px;
    line-height: 42px;
    text-decoration-line: line-through;
    color: #919191;
  }
`;

export const DescGrid = styled(Grid)`
  padding: 20px;
  p {
    font-weight: 700;
    font-size: 22px;
    color: #222222;
  }
  .grid-desc-title {
    margin-bottom: 16px;
  }
`;

export const SubImageBox = styled(Box)`
  display: flex;
  margin-left: 18px;
  div {
    position: relative;
    padding: 3.2px;
  }
  img {
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.4;
  }
  .selected {
    outline: 2px solid #5bbd6b;
    outline-offset: -2px;
    opacity: 1;
  }
`;

export const PurchaseTabGrid = styled(Grid)`
  position: fixed;
  bottom: 0;
  width: 640px;
  height: 60px;
  margin: 0 auto;
  background-color: #fc6e51;
  border-radius: 10px 10px 0px 0px;
  z-index: 1;
  color: white;
  text-align: center;
  .div-purchase-favorite-icon {
    line-height: 81px;
    svg {
      cursor: pointer;
      font-size: 2rem;
    }
  }
  .div-purchase-cart-icon {
    line-height: 77px;
    svg {
      cursor: pointer;
      font-size: 2rem;
    }
  }
  .div-purchase-text {
    font-weight: 700;
    font-size: 20px;
    line-height: 61px;
    cursor: pointer;
  }
  .grid-purchase-divider {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .divider {
      width: 17px;
      height: 17px;
    }
    .right-divider {
      border-right: 1px solid white;
    }
    .left-divider {
      border-left: 1px solid white;
    }
  }
`;
