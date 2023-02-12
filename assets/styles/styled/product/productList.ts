import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";

export const ProductImageStyle = styled.div`
  text-align: center;
  position: relative;
  .image {
    border-radius: 18px;
  }
  .label {
    position: absolute;
    top: 6%;
    left: 11%;
    background-color: #5bbd6b;
    color: #ffffff;
    border-radius: 4px;
    font-size: 12px;
    height: 22px;
    width: 54px;
    line-height: 20px;
    text-align: center;
    font-weight: 800;
  }
  .like {
    cursor: pointer;
    position: absolute;
    top: 82%;
    left: 79%;
    z-index: 1;
  }
  .sold-out {
    position: absolute;
    border-radius: 18px;
    top: 0%;
    left: 5%;
    width: 289px;
    height: 289px;
    background-color: rgba(0, 0, 0, 0.5);
    .text {
      position: absolute;
      top: 44%;
      left: 42%;
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;

export const ProductListInfoGrid = styled(Grid)`
  .grid-product-text-padding {
    padding-left: 24px;
    p {
      font-weight: 400;
      font-size: 16px;
    }
  }
  .grid-product-sort-margin {
    margin-bottom: 24px;
    text-align: center;
    .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input {
      padding: 0px 50px 0px 0px;

      font-weight: 400;
      font-size: 16px;
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }

  .grid-product-filter-margin {
    padding-left: 15px;
    text-align: center;
    margin-bottom: 40px;
    .MuiOutlinedInput-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary {
      border-radius: 25px !important;
      .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input {
        padding: 10px 30px 10px 20px;
        font-weight: 400;
        font-size: 16px;
        color: #919191;
      }
    }
  }
`;

export const ProductInfoGrid = styled(Grid)`
  .grid-product-img-margin {
    margin-bottom: 12px;
  }
  .div-product-desc {
    margin-left: 17px;
    margin-bottom: 30px;
    div {
      max-width: 95% !important;
    }
    .grid-product-brand {
      margin-bottom: 12px;
      .rank {
        font-size: 12pt;
        color: #424242;
        margin-right: 7px;
      }
      .brand {
        font-size: 12pt;
        color: #919191;
      }
    }
    .grid-product-name {
      margin-bottom: 12px;
      p {
        color: #383838;
        fontsize: 16px;
      }
    }
    .grid-product-price {
      display: flex;
      margin-bottom: 12px;
      .dcRate {
        font-size: 20pt;
        color: #fc6e51;
        margin-right: 15px;
      }
      .price {
        font-size: 20pt;
        color: #222222;
      }
    }
  }
`;
