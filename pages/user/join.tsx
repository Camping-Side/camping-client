/** @jsxImportSource @emotion/react */
import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../layout/Layout";
import styled from "@emotion/styled";
import { checkEmailDup, checkPhoneDup } from "../../actions/account";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import authSlice from "@reducers/auth";
import accountSlice from "@reducers/account";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordCheck: string;
  birth: string;
};

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const CheckDupBtn = styled(Button)`
  margin-top: 7pt;
`;

const Join: FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Inputs>();

  const { joinDone } = useSelector((state: any) => state.auth);
  const { isPhoneDup, checkPhoneDupDone, isEmailDup, checkEmailDupDone } =
    useSelector((state: any) => state.account);

  useEffect(() => {
    return () => {
      dispatch(accountSlice.actions.resetDupChecked());
    };
  }, []);

  useEffect(() => {
    if (joinDone) {
      dispatch(authSlice.actions.joinDone());
      Router.push("/user/login");
    }
  }, [joinDone]);

  useEffect(() => {
    if (checkPhoneDupDone && isPhoneDup) {
      alert("중복된 휴대폰번호입니다.");
    } else if (checkPhoneDupDone && !isPhoneDup) {
      alert("사용가능한 휴대폰번호입니다.");
    }
  }, [checkPhoneDupDone, isPhoneDup]);

  useEffect(() => {
    if (checkEmailDupDone && isEmailDup) {
      alert("중복된 아이디(이메일)입니다.");
    } else if (checkEmailDupDone && !isEmailDup) {
      alert("사용가능한 아이디(이메일)입니다.");
    }
  }, [checkEmailDupDone, isEmailDup]);

  const handleCheckPhoneDup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const phone = watch("phone");
    if (!phone) {
      alert("휴대폰번호를 입력하세요.");
      return;
    }
    const checkPhoneDupParam = {
      phone: phone,
    };
    // @ts-ignore
    dispatch(checkPhoneDup(checkPhoneDupParam));
  };

  const handleCheckEmailDup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const email = watch("email");
    if (!email) {
      alert("아이디(이메일)을 입력하세요.");
      return;
    }
    const checkEmailDupParam = {
      email: email,
    };
    // @ts-ignore
    dispatch(checkEmailDup(checkEmailDupParam));
  };

  /*const onSubmit = (data: any) => {
    console.log('data: ', data)
    // if (isPhoneDup) {
    //   alert("휴대폰 중복확인을 해주세요.");
    //   return;
    // }
    // const joinParam = {
    //   username: name,
    //   email: id,
    //   password: password,
    //   age: age,
    //   phone: phone,
    // };
    // // @ts-ignore
    // dispatch(join(joinParam));
  };*/

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const errorMessage = {
    name: () => {
      return !!errors.name ? "이름을 입력하세요" : "";
    },
    phone: () => {
      let msg = "";
      if (errors.email?.type === "pattern") {
        msg = "정확한 이메일을 입력해주세요";
      } else if (isEmailDup) {
        msg = "중복된 아이디(이메일)입니다";
      } else if (!!errors.email) {
        msg = "아이디(이메일)을 입력해주세요";
      }
      return msg;
    },
  };

  const formInfo = {
    name: {
      label: "이름",
      value: { ...register("name", { required: true }) },
      error: !!errors.name,
      errorMessage: errorMessage.name(),
    },
    phone: {
      label: "휴대폰번호(숫자만입력)",
      value: {
        ...register("phone", { required: true }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue(
            "phone",
            e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
          );
        },
      },
      error: !!errors.phone || isPhoneDup,
      errorMessage: isPhoneDup
        ? "중복된 휴대폰번호입니다"
        : "휴대폰번호를 입력하세요",
    },
    email: {
      label: "아이디(이메일)",
      value: {
        ...register("email", {
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        }),
      },
      error: !!errors.email || isEmailDup,
      errorMessage: errorMessage.phone(),
    },
    password: {
      label: "비밀번호",
      value: { ...register("password", { required: true }) },
      error: !!errors.password || watch("password") !== watch("passwordCheck"),
      errorMessage: errors.password
        ? "비밀번호를 입력해주세요"
        : "비밀번호가 서로 일치하지 않습니다",
    },
    passwordCheck: {
      label: "비밀번호 확인",
      value: { ...register("passwordCheck", { required: true }) },
      error:
        !!errors.passwordCheck || watch("password") !== watch("passwordCheck"),
      errorMessage: errors.passwordCheck
        ? "비밀번호를 입력해주세요"
        : "비밀번호가 서로 일치하지 않습니다",
    },
    birth: {
      label: "생년월일",
      value: { ...register("birth", { required: true }) },
      error: !!errors.birth,
      errorMessage: !!errors.birth ? "생년월일을 입력해주세요" : "",
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
            회원가입
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
                    label={formInfo.name.label}
                    {...formInfo.name.value}
                    error={formInfo.name.error}
                    helperText={formInfo.name.errorMessage}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={formInfo.phone.label}
                    {...formInfo.phone.value}
                    error={formInfo.phone.error}
                    helperText={formInfo.phone.errorMessage}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CheckDupBtn
                    variant="outlined"
                    size="medium"
                    onClick={handleCheckPhoneDup}
                  >
                    중복확인
                  </CheckDupBtn>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={formInfo.email.label}
                    {...formInfo.email.value}
                    error={formInfo.email.error}
                    helperText={formInfo.email.errorMessage}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CheckDupBtn
                    variant="outlined"
                    size="medium"
                    onClick={handleCheckEmailDup}
                  >
                    중복확인
                  </CheckDupBtn>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label={formInfo.password.label}
                    {...formInfo.password.value}
                    error={formInfo.password.error}
                    helperText={formInfo.password.errorMessage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label={formInfo.passwordCheck.label}
                    {...formInfo.passwordCheck.value}
                    error={formInfo.passwordCheck.error}
                    helperText={formInfo.passwordCheck.errorMessage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={formInfo.birth.label}
                    {...formInfo.birth.value}
                    error={formInfo.birth.error}
                    helperText={formInfo.birth.errorMessage}
                  />
                </Grid>
              </Grid>
              {/*<Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                disabled={
                  !checkPhoneDupDone || isPhoneDup || !checkEmailDupDone || isEmailDup
                }
              >
                회원가입
              </Button>*/}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </Layout>
  );
};

export default Join;
