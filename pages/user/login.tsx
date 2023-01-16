import React, { FC, useEffect, useState } from "react";
import Layout from "@layout/Layout";
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
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

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const SocialButtonGrid = styled(Grid)`
  img {
    padding: 10px;
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
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Typography component="h1" variant="h5" mb={5}>
            로그인
          </Typography>
          <Boxs
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography mb={2} sx={{ fontWeight: 700 }}>
                    이메일
                  </Typography>
                  <TextField
                    fullWidth
                    label={formInfo.email.label}
                    {...formInfo.email.value}
                    error={formInfo.email.error}
                    helperText={formInfo.email.errorMessage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography mb={2} sx={{ fontWeight: 700 }}>
                    비밀번호
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    label={formInfo.password.label}
                    {...formInfo.password.value}
                    error={formInfo.password.error}
                    helperText={formInfo.password.errorMessage}
                  />
                </Grid>
                <Grid item xs={6} mb={4}>
                  <FormControlLabel
                    sx={{ fontSize: "16px", fontWeight: "400" }}
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
                <Grid item xs={12} mb={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      ":hover": {
                        bgcolor: "#FC6E51",
                      },
                      color: "white",
                      backgroundColor: "#FC6E51",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                    disableFocusRipple
                    size="large"
                  >
                    로그인
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }} mb={15}>
                  <Link
                    href="/user/find"
                    underline={"none"}
                    color={"black"}
                    sx={{ fontSize: "16px", fontWeight: "400" }}
                  >
                    회원정보찾기
                  </Link>{" "}
                  |{" "}
                  <Link
                    href="/user/join"
                    underline={"none"}
                    color={"black"}
                    sx={{ fontSize: "16px", fontWeight: "400" }}
                  >
                    회원가입
                  </Link>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }} mb={3}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#919191",
                    }}
                  >
                    SNS 계정으로 로그인
                  </Typography>
                </Grid>
                <SocialButtonGrid
                  item
                  xs={12}
                  sx={{ textAlign: "center" }}
                  mb={25}
                >
                  <img src={SocialLoginKakao.src} />
                  <img src={SocialLoginNaver.src} />
                  <img src={SocialLoginGoogle.src} />
                </SocialButtonGrid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#919191",
                      textDecoration: "underline",
                    }}
                  >
                    로그인에 어려움이 있나요?
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
