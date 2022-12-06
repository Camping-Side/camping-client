import React, { FC, useEffect, useState } from "react";
import Layout from "@layout/Layout";
import Link from "next/link";
import {
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material/";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styled from "@emotion/styled";
import SocialLoginComponent from "../../components/user/SocialLogin";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/user";
import Router from "next/router";

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

interface loginInfo {
  id: string;
  password: string;
  showPassword: boolean;
}

const Login: FC = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState<loginInfo>({
    id: "",
    password: "",
    showPassword: false,
  });
  const [rememberChecked, setRememberChecked] = useState(false);

  const { loginDone } = useSelector((state: any) => state.user);

  //mounted
  useEffect(() => {
      //remember 체크
      if(localStorage.getItem('camporest_remember')){
        const rememberId = localStorage.getItem('camporest_remember') || ""
        setValues({
          ...values,
          id: rememberId
        })
        setRememberChecked(true)
      }
  }, []);

  //loginDone
  useEffect(() => {
    if (loginDone) {
      if(rememberChecked && !localStorage.getItem('camporest_remember')){
        localStorage.setItem('camporest_remember', values.id)
      }
      Router.push("/");
    }
  }, [loginDone]);

  const handleChange =
    (prop: keyof loginInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(login({ email: values.id, password: values.password }));
  };

  const checkRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberChecked(event.target.checked);
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
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="email"
                    value={values.id}
                    onChange={handleChange("id")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <OutlinedInput
                    id="password"
                    label="password"
                    fullWidth
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={checkRemember} checked={rememberChecked} color="primary" />
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
