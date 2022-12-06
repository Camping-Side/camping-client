/** @jsxImportSource @emotion/react */
import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import BaseSelect from "../../components/common/BaseSelect";
import BaseTextField from "../../components/common/BaseTextField";
import Layout from "../../layout/Layout";
import useInputs from "../../hooks/useInput";
import styled from "@emotion/styled";
import { join } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import userSlice from "@reducers/user";

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const SAMPLE_SELECT_LIST = [
  { id: 0, text: "None", value: "" },
  { id: 1, text: "10", value: "10" },
  { id: 2, text: "20", value: "20" },
  { id: 3, text: "30", value: "30" },
];

const Join: FC = () => {
  const dispatch = useDispatch();

  const { joinDone } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (joinDone) {
      dispatch(userSlice.actions.joinDone());
      Router.push("/user/login");
    }
  }, [joinDone]);

  // select box 함수
  const [age, setAge] = useState("");
  const handleAgeChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const [{ name, id, password }, onChange, reset] = useInputs({
    name: "",
    id: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const joinParam = {
      username: name,
      email: id,
      password: password,
      age: age,
    };
    // @ts-ignore
    dispatch(join(joinParam));
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
          <Boxs component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <BaseTextField
                    id="outlined-error"
                    name="name"
                    label="이름"
                    message="이름을 입력해주세요"
                    value={name}
                    error={false}
                    required={true}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BaseTextField
                    id="outlined-required"
                    name="id"
                    label="아이디"
                    message="아이디를 입력해주세요"
                    value={id}
                    error={false}
                    required={true}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BaseTextField
                    id="outlined-error"
                    name="password"
                    label="비밀번호"
                    message="비밀번호를 입력해주세요"
                    value={password}
                    error={false}
                    required={true}
                    type="password"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BaseSelect
                    selectList={SAMPLE_SELECT_LIST}
                    label={"나이"}
                    selected={age}
                    handleChange={handleAgeChange}
                    message={"나이를 선택해 주세요"}
                    required={true}
                  />
                </Grid>
              </Grid>
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
