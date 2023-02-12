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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SocialLoginNaver from "../../assets/img/temp/socialLogin_naver.png";
import SocialLoginKakao from "../../assets/img/temp/socialLogin_kakao.png";
import SocialLoginGoogle from "../../assets/img/temp/socialLogin_google.png";
import CustomLink from "@cp/common/CustomLink";
import { LoginInputs, LoginReqData } from "../../type/auth/auth";

//styled-component
import { LoginBox } from "../../assets/styles/styled/auth/login";
import { AppDispatch } from "../../store/configureStore";

const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [rememberChecked, setRememberChecked] = useState(false);
  const checkRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberChecked(event.target.checked);
  };
  useEffect(() => {
    //remember 체크
    if (localStorage.getItem("camporest_remember")) {
      const rememberId = localStorage.getItem("camporest_remember") || "";
      setValue("email", rememberId);
      setRememberChecked(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    const { email, password } = data;
    const loginParam: LoginReqData = {
      email: email,
      password: password,
    };
    dispatch(login(loginParam))
      .unwrap()
      .then((res) => {
        if (rememberChecked && !localStorage.getItem("camporest_remember")) {
          localStorage.setItem("camporest_remember", watch("email"));
        }
        Router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
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
            {/*<Grid item xs={12} className={"grid-login-sns-text-margin"}>
              <Typography>SNS 계정으로 로그인</Typography>
            </Grid>
            <Grid item xs={12} className={"grid-login-sns-button-margin"}>
              <img src={SocialLoginKakao.src} />
              <img src={SocialLoginNaver.src} />
              <img src={SocialLoginGoogle.src} />
            </Grid>*/}
            <Grid item xs={12} className={"grid-login-qna"}>
              <CustomLink href={"/qna"}>로그인에 어려움이 있나요?</CustomLink>
            </Grid>
          </Grid>
        </FormControl>
      </LoginBox>
    </Layout>
  );
};

export default Login;
