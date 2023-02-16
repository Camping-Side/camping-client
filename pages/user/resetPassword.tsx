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
import { resetPassword } from "../../actions/account";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../store/configureStore";

type Inputs = {
  phone: string;
  email: string;
};

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const ResetPassword: FC = () => {
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

  const { resetPasswordDone } = useSelector(
    (state: RootState) => state.account
  );

  useEffect(() => {
    if (resetPasswordDone) {
      alert("비밀번호가 재설정되었습니다.");
      router.push("/user/login");
    }
  }, [resetPasswordDone]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, phone } = data;
    const resetPasswordParam = {
      email: email,
      phone: phone,
    };
    // @ts-ignore
    dispatch(resetPassword(resetPasswordParam));
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
    email: () => {
      let msg = "";
      console.log("errors: ", errors);
      if (errors.email?.type === "pattern") {
        msg = "정확한 이메일을 입력해주세요";
      } else if (!!errors.email) {
        msg = "아이디(이메일)을 입력해주세요";
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
          setValue("email", e.target.value);
          resetError("email");
        },
      },
      error: !!errors.email,
      errorMessage: errorMessage.email(),
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
            비밀번호 재설정
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
                    label={formInfo.phone.label}
                    {...formInfo.phone.value}
                    error={formInfo.phone.error}
                    helperText={formInfo.phone.errorMessage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={formInfo.email.label}
                    {...formInfo.email.value}
                    error={formInfo.email.error}
                    helperText={formInfo.email.errorMessage}
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
                  formInfo.email.error ||
                  !getValues("phone") ||
                  !getValues("email")
                }
              >
                비밀번호 재설정
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
