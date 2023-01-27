import React, { FC, useEffect, useState } from "react";
import Layout from "@layout/Layout";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material/";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SocialLoginNaver from "../../assets/img/temp/socialLogin_naver.png";
import SocialLoginKakao from "../../assets/img/temp/socialLogin_kakao.png";
import SocialLoginGoogle from "../../assets/img/temp/socialLogin_google.png";
import CustomLink from "@cp/common/CustomLink";

const LoginBox = styled(Box)`
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
    p {
      font-size: 16px;
      font-weight: 400;
      color: #919191;
      text-decoration: underline;
    }
  }
`;

type Inputs = {
  email: string;
  password: string;
};

const Login: FC = () => {
  //mounted
  useEffect(() => {
    //remember 체크
    if (localStorage.getItem("camporest_remember")) {
      const rememberId = localStorage.getItem("camporest_remember") || "";
      setValue("email", rememberId);
      setRememberChecked(true);
    }
  }, []);

  const dispatch = useDispatch();

  //react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm<Inputs>();

  //remember
  const [rememberChecked, setRememberChecked] = useState(false);
  const checkRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberChecked(event.target.checked);
  };

  const { loginDone, loginError } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (loginDone) {
      if (rememberChecked && !localStorage.getItem("camporest_remember")) {
        localStorage.setItem("camporest_remember", watch("email"));
      }
      Router.push("/");
    } else if (loginError) {
      alert("로그인 에러");
    }
  }, [loginDone, loginError]);

  //로그인
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    const loginParam = {
      email: email,
      password: password,
    };
    // @ts-ignore
    dispatch(login(loginParam));
  };

  const errorMessage = {
    email: () => {
      let msg = "";
      if (errors.email?.type === "pattern") {
        msg = "정확한 이메일을 입력해주세요";
      } else if (!!errors.email) {
        msg = "아이디(이메일)을 입력해주세요";
      }
      return msg;
    },
    password: () => {
      let msg = "";
      if (errors.password?.type === "minLength") {
        msg = "비밀번호를 정확히 입력해주세요(6~12자리)";
      } else if (!!errors.password) {
        msg = "비밀번호를 입력해주세요";
      }
      return msg;
    },
  };

  const resetError = (item: any) => {
    clearErrors(item);
    if (!watch(item)) {
      setError(item, { type: "empty", message: "empty" });
    }
  };

  const formInfo = {
    email: {
      label: "camporest@camporest.com",
      value: {
        ...register("email", {
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          resetError("email");
        },
      },
      error: !!errors.email,
      errorMessage: errorMessage.email(),
    },
    password: {
      label: "비밀번호 입력",
      value: {
        ...register("password", {
          required: true,
          minLength: 4,
        }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue("password", e.target.value.substring(0, 12));
          resetError("password");
        },
      },
      error: !!errors.password,
      errorMessage: errorMessage.password(),
    },
  };

  return (
    <Layout>
      <LoginBox component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset" variant="standard">
          <Grid container>
            <Grid item xs={12} className={"grid-login-title-margin"}>
              <Typography>로그인</Typography>
            </Grid>
            <Grid item xs={12} className={"grid-login-email-margin"}>
              <Typography>이메일</Typography>
              <TextField
                fullWidth
                label={formInfo.email.label}
                {...formInfo.email.value}
                error={formInfo.email.error}
                helperText={formInfo.email.errorMessage}
              />
            </Grid>
            <Grid item xs={12} className={"grid-login-password-margin"}>
              <Typography>비밀번호</Typography>
              <TextField
                fullWidth
                type="password"
                label={formInfo.password.label}
                {...formInfo.password.value}
                error={formInfo.password.error}
                helperText={formInfo.password.errorMessage}
              />
            </Grid>
            <Grid item xs={6} className={"grid-login-remember-margin"}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={checkRemember}
                    checked={rememberChecked}
                    icon={<CheckCircleIcon />}
                    checkedIcon={<CheckCircleIcon />}
                  />
                }
                label="아이디 저장"
              />
            </Grid>
            <Grid item xs={12} className={"grid-login-button-margin"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableFocusRipple
                size="large"
              >
                로그인
              </Button>
            </Grid>
            <Grid item xs={12} className={"grid-login-join-margin"}>
              <CustomLink href="/user/find">회원정보찾기</CustomLink> |{" "}
              <CustomLink href="/user/join">회원가입</CustomLink>
            </Grid>
            <Grid item xs={12} className={"grid-login-sns-text-margin"}>
              <Typography>SNS 계정으로 로그인</Typography>
            </Grid>
            <Grid item xs={12} className={"grid-login-sns-button-margin"}>
              <img src={SocialLoginKakao.src} />
              <img src={SocialLoginNaver.src} />
              <img src={SocialLoginGoogle.src} />
            </Grid>
            <Grid item xs={12} className={"grid-login-qna"}>
              <Typography>로그인에 어려움이 있나요?</Typography>
            </Grid>
          </Grid>
        </FormControl>
      </LoginBox>
    </Layout>
  );
};

export default Login;
