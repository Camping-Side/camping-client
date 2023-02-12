import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const LoginBox = styled(Box)`
  margin-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
  .grid-login-title-margin {
    margin-bottom: 50px;
    p {
      font-weight: 700;
      font-size: 22px;
    }
  }
  .grid-login-email-margin {
    margin-bottom: 30px;
    p {
      margin-bottom: 16px;
      font-weight: 700;
    }
  }
  .grid-login-password-margin {
    margin-bottom: 10px;
    p {
      margin-bottom: 16px;
      font-weight: 700;
    }
  }
  .grid-login-remember-margin {
    margin-bottom: 50px;
    .MuiFormControlLabel-label {
      font-size: 16px;
      font-weight: 400;
    }
  }
  .grid-login-button-margin {
    margin-bottom: 25px;
    button {
      color: white;
      :hover {
        background-color: #fc6e51;
      }
      background-color: #fc6e51;
      border-radius: 8px;
      font-weight: 700;
      font-size: 16px;
    }
  }
  .grid-login-join-margin {
    text-align: center;
    margin-bottom: 150px;
  }
  .grid-login-sns-text-margin {
    text-align: center;
    margin-bottom: 24px;
    p {
      font-size: 16px;
      font-weight: 400;
      color: #919191;
    }
  }
  .grid-login-sns-button-margin {
    text-align: center;
    margin-bottom: 200px;
    img {
      padding: 10px;
    }
  }
  .grid-login-qna {
    text-align: center;
    a {
      font-size: 16px;
      font-weight: 400;
      color: #919191;
      text-decoration: underline;
    }
  }
`;
