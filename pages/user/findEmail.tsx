/** @jsxImportSource @emotion/react */
import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { findEmail } from "../../actions/account";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../store/configureStore";

type Inputs = {
  phone: string;
  name: string;
};

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const FindEmail: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    setError,
  } = useForm<Inputs>();

  const { findEmailDone, findEmailResult } = useSelector(
    (state: RootState) => state.account
  );

  useEffect(() => {
    if (findEmailDone) {
      alert("아이디는 " + findEmailResult + "입니다.");
      router.push("/user/login");
    }
  }, [findEmailDone]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, phone } = data;
    const findEmailParam = {
      username: name,
      phone: phone,
    };
    // @ts-ignore
    dispatch(findEmail(findEmailParam));
  };

  const errorMessage = {
    phone: () => {
      let msg = "";
      if (errors.phone?.type === "minLength") {
        msg = "휴대폰번호를 정확히 입력해주세요";
      } else if (!!errors.phone) {
        msg = "휴대폰번호를 입력해주세요";
      }
      return msg;
    },
    name: () => {
      return !!errors.name ? "이름을 입력하세요" : "";
    },
  };

  const resetError = (item: any) => {
    clearErrors(item);
    if (!watch(item)) {
      setError(item, { type: "empty", message: "empty" });
    }
  };

  const formInfo = {
    phone: {
      label: "휴대폰번호(숫자만입력)",
      value: {
        ...register("phone", { required: true, minLength: 10 }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue(
            "phone",
            e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1")
              .substring(0, 11)
          );
          resetError("phone");
        },
      },
      error: !!errors.phone,
      errorMessage: errorMessage.phone(),
    },
    name: {
      label: "이름",
      value: {
        ...register("name", { required: true }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue("name", e.target.value.substring(0, 9));
          resetError("name");
        },
      },
      error: !!errors.name,
      errorMessage: errorMessage.name(),
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
            아이디(이메일) 찾기
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
                    label={formInfo.name.label}
                    {...formInfo.name.value}
                    error={formInfo.name.error}
                    helperText={formInfo.name.errorMessage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={formInfo.phone.label}
                    {...formInfo.phone.value}
                    error={formInfo.phone.error}
                    helperText={formInfo.phone.errorMessage}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                disabled={
                  formInfo.phone.error ||
                  formInfo.name.error ||
                  !getValues("phone") ||
                  !getValues("name")
                }
              >
                아이디(이메일) 찾기
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </Layout>
  );
};

export default FindEmail;
