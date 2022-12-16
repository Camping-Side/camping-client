import React, { FC, useEffect, useState } from "react";
import Layout from "@layout/Layout";
import Link from "next/link";
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
} from "@mui/material/";
import styled from "@emotion/styled";
import SocialLoginComponent from "../../components/user/SocialLogin";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
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

  //loginDone
  const { loginDone } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (loginDone) {
      if (rememberChecked && !localStorage.getItem("camporest_remember")) {
        localStorage.setItem("camporest_remember", watch("email"));
      }
      Router.push("/");
    }
  }, [loginDone]);

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
      label: "아이디(이메일)",
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
      label: "비밀번호(6~12자리)",
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Typography component="h1" variant="h5">
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
                  <TextField
                    fullWidth
                    label={formInfo.email.label}
                    {...formInfo.email.value}
                    error={formInfo.email.error}
                    helperText={formInfo.email.errorMessage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label={formInfo.password.label}
                    {...formInfo.password.value}
                    error={formInfo.password.error}
                    helperText={formInfo.password.errorMessage}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={checkRemember}
                        checked={rememberChecked}
                        color="primary"
                      />
                    }
                    label="remember"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Link href="/user/find">회원정보찾기</Link> /{" "}
                  <Link href="/user/join">회원가입</Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
      <SocialLoginComponent />
    </Layout>
  );
};

export default Login;
