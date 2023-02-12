import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";

export const JoinGrid = styled(Grid)`
  padding: 25px;
  .grid-title {
    margin-bottom: 30px;
    p {
      font-size: 22px;
      font-weight: 700;
    }
  }
  .grid-form {
    margin-top: 32px;
  }

  .grid-form-submit {
    margin-top: 32px;
    margin-bottom: 100px;
    button {
      border-radius: 8px;
      background-color: #fc6e51;
      border: 0px;
      :hover {
        background-color: #fc6e51;
        border: 0px;
      }
      :disabled {
        background-color: #e9e9e9;
        color: #919191;
      }
      color: white;
      float: right;
      height: 56px;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

export const FormGrid = styled(Grid)`
  p {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .grid-form-item {
    margin-bottom: 25px;
  }
  .submit-button {
  }
`;

export const DupCheckButtonGrid = styled(Grid)`
  margin-top: 33px;
  button {
    border-radius: 8px;
    background-color: #fc6e51;
    border: 0px;
    :hover {
      background-color: #fc6e51;
      border: 0px;
    }
    :disabled {
      background-color: #e9e9e9;
      color: #919191;
    }
    color: white;
    float: right;
    height: 56px;
    font-size: 16px;
    font-weight: 700;
  }
`;
