import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";

export const CommunityHeaderGrid = styled(Grid)`
  img {
    width: 100%;
  }
  .grid-category-button {
    padding: 16px;
    text-align: center;
    button {
      height: 40px;
      width: 60px;
      border: 1px solid #e9e9e9;
      border-radius: 120px;
      font-size: 16px;
      line-height: 24px;
      color: #919191;
    }
    .selected_category {
      border: 1px solid #5bbd6b;
      color: white;
      background-color: #5bbd6b;
    }
    .box-sort {
      display: flex;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      margin-top: 20px;
      float: right;
      font-style: normal;
      color: #919191;
      .like {
        cursor: pointer;
        margin-right: 5px;
      }
      .near {
        cursor: pointer;
        margin-left: 5px;
      }
      .selected_sort {
        color: #222222;
      }
    }
  }
`;

export const CommunityDescGrid = styled(Grid)`
  padding: 19px;
  .grid-desc-category {
    p {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      color: #5bbd6b;
    }
  }
  .grid-desc-title {
    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 28px;
      color: #222222;
    }
  }
  .grid-desc-detail {
    margin-top: 16px;
    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #4e4e4e;
    }
  }
  .grid-desc-img {
    margin-top: 14px;
    text-align: center;
  }
  .grid-desc-user-img {
    display: flex;
    margin-top: 14px;
    img {
      margin-right: 10px;
    }
  }
  .grid-desc-like {
    img {
      margin-right: 7px;
    }
    div {
      display: flex;
      float: right;
    }
    color: #919191;
    margin-top: 14px;
  }
  .grid-desc-comment {
    img {
      margin-right: 7px;
    }
    div {
      display: flex;
      float: right;
    }
    color: #919191;
    margin-top: 14px;
  }
`;
