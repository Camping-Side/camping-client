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
import { checkEmailDup, checkPhoneDup } from "../../actions/account";
import { join } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import authSlice from "@reducers/auth";
import accountSlice from "@reducers/account";

type Inputs = {
  name: string;
  nickname: string;
  phone: string;
  email: string;
  password: string;
  passwordCheck: string;
  birth: string;
};

const JoinGrid = styled(Grid)`
  padding: 25px;
  .grid-title {
    margin-bottom: 30px;
    p {
      font-size: 22px;
      font-weight: 700;
    }
  }
  .grid-form {
    margin-top: 32px;
  }

  .grid-form-submit {
    margin-top: 32px;
    margin-bottom: 100px;
    button {
      border-radius: 8px;
      background-color: #fc6e51;
      border: 0px;
      :hover {
        background-color: #fc6e51;
        border: 0px;
      }
      :disabled {
        background-color: #e9e9e9;
        color: #919191;
      }
      color: white;
      float: right;
      height: 56px;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

const FormGrid = styled(Grid)`
  p {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .grid-form-item {
    margin-bottom: 25px;
  }
  .submit-button {
  }
`;

const DupCheckButtonGrid = styled(Grid)`
  margin-top: 33px;
  button {
    border-radius: 8px;
    background-color: #fc6e51;
    border: 0px;
    :hover {
      background-color: #fc6e51;
      border: 0px;
    }
    :disabled {
      background-color: #e9e9e9;
      color: #919191;
    }
    color: white;
    float: right;
    height: 56px;
    font-size: 16px;
    font-weight: 700;
  }
`;

const Join: FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
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
      alert("회원가입되었습니다");
      dispatch(authSlice.actions.joinDone());
      Router.push("/user/login");
    }
  }, [joinDone]);

  useEffect(() => {
    if (checkPhoneDupDone && isPhoneDup) {
      alert("중복된 휴대폰번호입니다.");
    } else if (checkPhoneDupDone && !isPhoneDup) {
      alert("사용가능한 휴대폰번호입니다.");
      clearErrors("phone");
    }
  }, [checkPhoneDupDone, isPhoneDup]);

  useEffect(() => {
    if (checkEmailDupDone && isEmailDup) {
      alert("중복된 아이디(이메일)입니다.");
    } else if (checkEmailDupDone && !isEmailDup) {
      alert("사용가능한 아이디(이메일)입니다.");
      clearErrors("email");
    }
  }, [checkEmailDupDone, isEmailDup]);

  const handleCheckPhoneDup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const phone = watch("phone");
    if (!phone) {
      alert("휴대폰번호를 입력하세요.");
      return;
    } else if (phone && phone.length < 10) {
      alert("휴대폰번호를 정확히 입력하세요.");
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
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      alert("아이디(이메일)을 입력하세요.");
      return;
    } else if (!pattern.test(email)) {
      alert("아이디(이메일)을 정확히 입력하세요.");
      return;
    }
    const checkEmailDupParam = {
      email: email,
    };
    // @ts-ignore
    dispatch(checkEmailDup(checkEmailDupParam));
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, email, password, phone, birth } = data;
    const joinParam = {
      username: name,
      email: email,
      password: password,
      birth: birth,
      phone: phone,
    };
    // @ts-ignore
    dispatch(join(joinParam));
  };

  const errorMessage = {
    name: () => {
      return !!errors.name ? "이름을 입력하세요" : "";
    },
    nickname: () => {
      return !!errors.nickname ? "별명을 입력하세요" : "";
    },
    phone: () => {
      let msg = "";
      if (errors.phone?.type === "minLength") {
        msg = "휴대폰번호를 정확히 입력해주세요";
      } else if (isPhoneDup) {
        msg = "중복된 휴대폰번호입니다";
      } else if (!!errors.phone) {
        msg = "휴대폰번호를 입력해주세요";
      }
      return msg;
    },
    email: () => {
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
    password: () => {
      let msg = "";
      if (errors.password?.type === "minLength") {
        msg = "비밀번호를 정확히 입력해주세요(6~12자리)";
      } else if (watch("password") !== watch("passwordCheck")) {
        msg = "비밀번호가 서로 일치하지 않습니다";
      } else if (!!errors.password) {
        msg = "비밀번호를 입력해주세요";
      }
      return msg;
    },
    passwordCheck: () => {
      let msg = "";
      if (errors.passwordCheck?.type === "minLength") {
        msg = "비밀번호를 정확히 입력해주세요(6~12자리)";
      } else if (watch("password") !== watch("passwordCheck")) {
        msg = "비밀번호가 서로 일치하지 않습니다";
      } else if (!!errors.passwordCheck) {
        msg = "비밀번호를 입력해주세요";
      }
      return msg;
    },
    birth: () => {
      let msg = "";
      if (errors.birth?.type === "minLength") {
        msg = "생년월일을 정확히 입력해주세요(8자리)";
      } else if (!!errors.birth) {
        msg = "생년월일을 입력해주세요";
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
    name: {
      value: {
        ...register("name", {
          required: true,
          onChange: (e) => {
            setValue("name", e.target.value.substring(0, 9));
            resetError("name");
          },
        }),
      },
      error: !!errors.name,
      errorMessage: errorMessage.name(),
    },
    nickname: {
      value: {
        ...register("nickname", {
          required: true,
          onChange: (e) => {
            setValue("nickname", e.target.value.substring(0, 9));
            resetError("nickname");
          },
        }),
      },
      error: !!errors.nickname,
      errorMessage: errorMessage.nickname(),
    },
    phone: {
      value: {
        ...register("phone", {
          required: true,
          minLength: 10,
          onChange: (e) => {
            setValue(
              "phone",
              e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1")
                .substring(0, 11)
            );
            resetError("phone");
          },
        }),
      },
      error: !!errors.phone || isPhoneDup,
      errorMessage: errorMessage.phone(),
      disabled: checkPhoneDupDone && !isPhoneDup,
    },
    email: {
      value: {
        ...register("email", {
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        }),
      },
      error: !!errors.email || isEmailDup,
      errorMessage: errorMessage.email(),
      disabled: checkEmailDupDone && !isEmailDup,
    },
    password: {
      value: {
        ...register("password", {
          required: true,
          minLength: 6,
          onChange: (e) => {
            setValue("password", e.target.value.substring(0, 12));
            resetError("password");
          },
        }),
      },
      error: !!errors.password || watch("password") !== watch("passwordCheck"),
      errorMessage: errorMessage.password(),
    },
    passwordCheck: {
      value: {
        ...register("passwordCheck", {
          required: true,
          minLength: 6,
          onChange: (e) => {
            setValue("passwordCheck", e.target.value.substring(0, 12));
            resetError("passwordCheck");
          },
        }),
      },
      error:
        !!errors.passwordCheck || watch("password") !== watch("passwordCheck"),
      errorMessage: errorMessage.passwordCheck(),
    },
    birth: {
      value: {
        ...register("birth", {
          required: true,
          minLength: 8,
          onChange: (e) => {
            setValue(
              "birth",
              e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1")
                .substring(0, 8)
            );
            resetError("birth");
          },
        }),
      },
      error: !!errors.birth,
      errorMessage: errorMessage.birth(),
    },
  };

  return (
    <Layout>
      <JoinGrid container>
        <Grid item xs={12} className={"grid-title"}>
          <Typography>회원가입</Typography>
        </Grid>
        <Grid item container xs={12} className={"grid-form"}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl component="fieldset" variant="standard">
              <FormGrid item container>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>이름</Typography>
                  <TextField
                    fullWidth
                    {...formInfo.name.value}
                    error={formInfo.name.error}
                    helperText={formInfo.name.errorMessage}
                  />
                </Grid>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>별명</Typography>
                  <TextField
                    fullWidth
                    {...formInfo.nickname.value}
                    error={formInfo.nickname.error}
                    helperText={formInfo.nickname.errorMessage}
                  />
                </Grid>
                <Grid item container xs={12} className={"grid-form-item"}>
                  <Grid item xs={9}>
                    <Typography>아이디(이메일)</Typography>
                    <TextField
                      placeholder={"camporest@camporest.com"}
                      fullWidth
                      {...formInfo.email.value}
                      error={formInfo.email.error}
                      helperText={formInfo.email.errorMessage}
                      disabled={formInfo.email.disabled}
                    />
                  </Grid>
                  <DupCheckButtonGrid item xs={3}>
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={handleCheckEmailDup}
                    >
                      중복확인
                    </Button>
                  </DupCheckButtonGrid>
                </Grid>
                <Grid item container xs={12} className={"grid-form-item"}>
                  <Grid item xs={9}>
                    <Typography>휴대전화</Typography>
                    <TextField
                      placeholder={"숫자만입력"}
                      fullWidth
                      {...formInfo.phone.value}
                      error={formInfo.phone.error}
                      helperText={formInfo.phone.errorMessage}
                      disabled={formInfo.phone.disabled}
                    />
                  </Grid>
                  <DupCheckButtonGrid item xs={3}>
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={handleCheckPhoneDup}
                    >
                      중복확인
                    </Button>
                  </DupCheckButtonGrid>
                </Grid>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>비밀번호</Typography>
                  <TextField
                    placeholder={"6~12자리"}
                    fullWidth
                    type="password"
                    {...formInfo.password.value}
                    error={formInfo.password.error}
                    helperText={formInfo.password.errorMessage}
                  />
                </Grid>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>비밀번호 재확인</Typography>
                  <TextField
                    placeholder={"6~12자리"}
                    fullWidth
                    type="password"
                    {...formInfo.passwordCheck.value}
                    error={formInfo.passwordCheck.error}
                    helperText={formInfo.passwordCheck.errorMessage}
                  />
                </Grid>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>생년월일</Typography>

                  <TextField
                    placeholder={"8자리 숫자만입력"}
                    fullWidth
                    {...formInfo.birth.value}
                    error={formInfo.birth.error}
                    helperText={formInfo.birth.errorMessage}
                  />
                </Grid>
                <Grid item xs={12} className={"grid-form-submit"}>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={handleCheckPhoneDup}
                    type="submit"
                    disabled={
                      !checkPhoneDupDone ||
                      isPhoneDup ||
                      !checkEmailDupDone ||
                      isEmailDup
                    }
                  >
                    회원가입
                  </Button>
                </Grid>
              </FormGrid>
            </FormControl>
          </Box>
        </Grid>
      </JoinGrid>
    </Layout>
  );
};

export default Join;
