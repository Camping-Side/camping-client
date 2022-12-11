/** @jsxImportSource @emotion/react */
import React, {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  SelectChangeEvent,
  Typography,
  TextField
} from "@mui/material";
import BaseSelect from "../../components/common/BaseSelect";
import BaseTextField from "../../components/common/BaseTextField";
import Layout from "../../layout/Layout";
import useInputs from "../../hooks/useInput";
import styled from "@emotion/styled";
import { join } from "../../actions/auth";
import { checkPhoneDup, checkEmailDup } from "../../actions/account";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import authSlice from "@reducers/auth";
import accountSlice from "@reducers/account";

type Inputs = {
  name: string,
  phone: string,
};

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const CheckDupBtn = styled(Button)`
  margin-top: 7pt;
`;

const SAMPLE_SELECT_LIST = [
  { id: 0, text: "None", value: "" },
  { id: 1, text: "10", value: "10" },
  { id: 2, text: "20", value: "20" },
  { id: 3, text: "30", value: "30" },
];

const Join: FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { joinDone } = useSelector((state: any) => state.auth);
  const { isPhoneDup, checkPhoneDupDone, isEmailDup, checkEmailDupDone } = useSelector(
    (state: any) => state.account
  );

  useEffect(()=>{
    return()=>{
      dispatch(accountSlice.actions.resetDupChecked());
    }
  },[]);

  useEffect(() => {
    if (joinDone) {
      dispatch(authSlice.actions.joinDone());
      Router.push("/user/login");
    }
  }, [joinDone]);

  useEffect(() => {
    if (checkPhoneDupDone && isPhoneDup) {
      alert("중복된 휴대폰번호입니다.");
    } else if(checkPhoneDupDone && !isPhoneDup){
      alert("사용가능한 휴대폰번호입니다.");
    }
  }, [checkPhoneDupDone, isPhoneDup]);

  useEffect(() => {
    if (checkEmailDupDone && isEmailDup) {
      alert("중복된 아이디(이메일)입니다.");
    } else if(checkEmailDupDone && !isEmailDup){
      alert("사용가능한 아이디(이메일)입니다.");
    }
  }, [checkEmailDupDone, isEmailDup]);

  // select box 함수
  const [age, setAge] = useState("");

  const handleAgeChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  /*const [{ name, id, password, phone }, onChange, reset] = useInputs({
    name: "",
    id: "",
    password: "",
    phone: "",
  });*/

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
    /*if (!id) {
      alert("아이디(이메일)을 입력하세요.");
      return;
    }
    const checkEmailDupParam = {
      email: id,
    };
    // @ts-ignore
    dispatch(checkEmailDup(checkEmailDupParam));*/
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

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

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
          <Boxs component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                      id="outlined-required"
                      label="이름"
                      {...register("name", { required: true })}
                      error={ !!errors.name }
                      helperText="이름을 입력하세요."
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                      id="outlined-required"
                      label="휴대폰번호"
                      {...register("phone", { required: true })}
                      error={ !!errors.phone || isPhoneDup}
                      helperText={ isPhoneDup ? "중복된 휴대폰번호입니다" : "휴대폰번호를 입력하세요." }
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
                  <BaseTextField
                    id="outlined-required"
                    label="아이디(이메일)"
                    message="아이디(이메일)를 입력해주세요"
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
                  <BaseTextField
                    id="outlined-error"
                    name="password"
                    label="비밀번호"
                    message="비밀번호를 입력해주세요"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <BaseSelect
                    selectList={SAMPLE_SELECT_LIST}
                    label={"나이"}
                    selected={age}
                    handleChange={handleAgeChange}
                    message={"나이를 선택해 주세요"}
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
